<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActionPlanRequest;
use App\Http\Requests\UpdateActionPlanRequest;
use App\Models\ActionPlan;
use App\Models\Initiative;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class ActionPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Initiative $initiative): JsonResponse
    {
        $actionPlans = $initiative->actionPlans()
            ->orderBy('display_order')
            ->get();
            
        return response()->json($actionPlans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActionPlanRequest $request, Initiative $initiative)
    {
        $validated = $request->validated();
        
        // Business logic validation
        if ($validated['current_month_progress'] > 100) {
            return back()->withErrors([
                'current_month_progress' => 'Progress cannot exceed 100%'
            ])->withInput();
        }
        
        if ($validated['cumulative_progress'] < $validated['current_month_progress']) {
            return back()->withErrors([
                'cumulative_progress' => 'Cumulative progress must be greater than or equal to current month progress'
            ])->withInput();
        }
        
        // Set initiative_id
        $validated['initiative_id'] = $initiative->id;
        
        $actionPlan = ActionPlan::create($validated);
        
        // Flash message for toast notification
        return back()->with('success', 'Action Plan created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Initiative $initiative, ActionPlan $actionPlan): JsonResponse
    {
        // Verify that the action plan belongs to the initiative
        if ($actionPlan->initiative_id !== $initiative->id) {
            return response()->json([
                'message' => 'Action Plan not found for this initiative'
            ], 404);
        }
        
        return response()->json($actionPlan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActionPlanRequest $request, ActionPlan $actionPlan)
    {
        $validated = $request->validated();
        
        // Business logic validation
        if ($validated['current_month_progress'] > 100) {
            return back()->withErrors([
                'current_month_progress' => 'Progress cannot exceed 100%'
            ])->withInput();
        }
        
        if ($validated['cumulative_progress'] < $validated['current_month_progress']) {
            return back()->withErrors([
                'cumulative_progress' => 'Cumulative progress must be greater than or equal to current month progress'
            ])->withInput();
        }
        
        $actionPlan->update($validated);
        
        // Update milestone status if needed
        if ($actionPlan->milestone) {
            $this->updateMilestoneStatus($actionPlan->milestone);
        }
        
        // Flash message for toast notification
        return back()->with('success', 'Action Plan updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActionPlan $actionPlan)
    {
        $actionPlan->delete();
        
        // Flash message for toast notification
        return back()->with('success', 'Action Plan deleted successfully');
    }
    
    /**
     * Calculate KPI metrics for an action plan
     */
    public function calculateKpiMetrics(ActionPlan $actionPlan): JsonResponse
    {
        $metrics = [];
        
        // Rumus 1: Achievement Rate
        $achievementRate = $actionPlan->cumulative_progress;
        $metrics['achievement_rate'] = [
            'name' => 'Achievement Rate',
            'formula' => '(Cumulative Progress / Target Progress) × 100%',
            'value' => $achievementRate,
            'unit' => '%',
            'status' => $this->getKpiStatus($achievementRate, [100, 75, 50])
        ];
        
        // Rumus 2: Monthly Progress Rate
        $monthlyProgressRate = $actionPlan->current_month_progress;
        $metrics['monthly_progress_rate'] = [
            'name' => 'Monthly Progress Rate',
            'formula' => 'Current Month Progress',
            'value' => $monthlyProgressRate,
            'unit' => '%',
            'status' => $this->getKpiStatus($monthlyProgressRate, [20, 15, 10])
        ];
        
        // Rumus 3: Progress Consistency
        $progressConsistency = $actionPlan->current_month_progress > 0 
            ? ($actionPlan->current_month_progress / $actionPlan->cumulative_progress) * 100 
            : 0;
        $metrics['progress_consistency'] = [
            'name' => 'Progress Consistency',
            'formula' => '(Current Month Progress / Cumulative Progress) × 100%',
            'value' => $progressConsistency,
            'unit' => '%',
            'status' => $this->getKpiStatus($progressConsistency, [80, 60, 40])
        ];
        
        // Rumus 4: Time Efficiency
        if ($actionPlan->due_date) {
            $today = now();
            $dueDate = \Carbon\Carbon::parse($actionPlan->due_date);
            $totalDays = $today->diffInDays($dueDate, false);
            
            if ($totalDays > 0) {
                $timeEfficiency = min(100, ($actionPlan->cumulative_progress * 365) / $totalDays);
            } else {
                $timeEfficiency = $actionPlan->cumulative_progress >= 100 ? 100 : 0;
            }
            
            $metrics['time_efficiency'] = [
                'name' => 'Time Efficiency',
                'formula' => '(Cumulative Progress × 365) / Remaining Days',
                'value' => $timeEfficiency,
                'unit' => '%',
                'status' => $this->getKpiStatus($timeEfficiency, [80, 60, 40])
            ];
        }
        
        // Rumus 5: Performance Index
        $performanceIndex = (
            ($achievementRate * 0.4) + 
            ($monthlyProgressRate * 0.3) + 
            ($progressConsistency * 0.3)
        );
        $metrics['performance_index'] = [
            'name' => 'Performance Index',
            'formula' => '(Achievement Rate × 0.4) + (Monthly Progress Rate × 0.3) + (Progress Consistency × 0.3)',
            'value' => $performanceIndex,
            'unit' => '',
            'status' => $this->getKpiStatus($performanceIndex, [80, 60, 40])
        ];
        
        return response()->json($metrics);
    }
    
    /**
     * Get KPI status based on value and thresholds
     */
    private function getKpiStatus($value, $thresholds): string
    {
        if ($value >= $thresholds[0]) {
            return 'excellent';
        } elseif ($value >= $thresholds[1]) {
            return 'good';
        } elseif ($value >= $thresholds[2]) {
            return 'average';
        } else {
            return 'poor';
        }
    }
    
    /**
     * Update milestone status based on action plans
     */
    private function updateMilestoneStatus($milestone): void
    {
        $actionPlans = $milestone->actionPlans;
        
        if ($actionPlans->isEmpty()) {
            return;
        }
        
        $totalProgress = $actionPlans->avg('cumulative_progress');
        
        if ($totalProgress >= 100) {
            $milestone->status = 'completed';
        } elseif ($totalProgress > 0) {
            $milestone->status = 'in_progress';
        } else {
            $milestone->status = 'not_started';
        }
        
        $milestone->save();
    }
}