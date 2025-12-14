<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActionPlanRequest;
use App\Http\Requests\UpdateActionPlanRequest;
use App\Models\ActionPlan;
use App\Models\Initiative;
use App\Models\MonthlyProgress;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Carbon\Carbon;

class ActionPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Initiative $initiative): JsonResponse
    {
        $actionPlans = $initiative->actionPlans()
            ->with('monthlyProgress')
            ->orderBy('display_order')
            ->get();
            
        return response()->json($actionPlans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActionPlanRequest $request, $code)
    {
        // Find initiative by code
        $initiative = Initiative::where('code', $code)->first();
        
        if (!$initiative) {
            return response()->json([
                'message' => 'Initiative not found',
                'errors' => [
                    'initiative' => 'Initiative with code ' . $code . ' not found'
                ]
            ], 404);
        }
        
        $validated = $request->validated();
        
        // Mengisi field yang di-generate otomatis oleh sistem
        $validated['initiative_id'] = $initiative->id;
        
        // activity_number dan display_order
        $nextNumber = $initiative->actionPlans()->count() + 1;
        $validated['activity_number'] = $validated['activity_number'] ?? $nextNumber;
        $validated['display_order'] = $validated['display_order'] ?? $nextNumber;
        
        try {
            // Membuat action plan baru
            // Model events will handle duration and weight calculation
            $actionPlan = ActionPlan::create($validated);
            
            // Process monthly progress if provided
            if (isset($validated['monthly_progress']) && is_array($validated['monthly_progress'])) {
                $this->processMonthlyProgress($actionPlan, $validated['monthly_progress']);
            }
            
            // Mengembalikan redirect dengan flash message
            return back()->with('success', 'Action Plan berhasil dibuat');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal membuat action plan: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Initiative $initiative, ActionPlan $actionPlan): JsonResponse
    {
        if ($actionPlan->initiative_id !== $initiative->id) {
            return response()->json([
                'message' => 'Action Plan not found for this initiative'
            ], 404);
        }
        
        $actionPlan->load('monthlyProgress');
        
        return response()->json($actionPlan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActionPlanRequest $request, ActionPlan $actionPlan)
    {
        $validated = $request->validated();
        
        try {
            // Update action plan
            // Model events will handle recalculation of duration and weight if dates change
            $actionPlan->update($validated);
            
            // Process monthly progress if provided
            if (isset($validated['monthly_progress']) && is_array($validated['monthly_progress'])) {
                $this->processMonthlyProgress($actionPlan, $validated['monthly_progress']);
            }
            
            // Update milestone status if exists
            if ($actionPlan->milestone) {
                $this->updateMilestoneStatus($actionPlan->milestone);
            }
            
            return back()->with('success', 'Action Plan berhasil diupdate');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal mengupdate action plan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActionPlan $actionPlan)
    {
        try {
            $actionPlan->delete();
            return back()->with('success', 'Action Plan berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus action plan: ' . $e->getMessage());
        }
    }
    
    /**
     * Process monthly progress data
     * Format: ['YYYY-MM' => progress_value]
     */
    private function processMonthlyProgress(ActionPlan $actionPlan, array $monthlyProgressData)
    {
        foreach ($monthlyProgressData as $monthKey => $progress) {
            try {
                // Parse YYYY-MM
                $date = Carbon::createFromFormat('Y-m', $monthKey);
                $year = $date->year;
                $month = $date->month;
                
                // Find or create monthly progress record
                $monthlyProgress = MonthlyProgress::firstOrNew([
                    'action_plan_id' => $actionPlan->id,
                    'year' => $year,
                    'month' => $month
                ]);
                
                $monthlyProgress->progress = $progress;
                $monthlyProgress->save(); // This will trigger calculateMonthlyContribution
                
            } catch (\Exception $e) {
                // Ignore invalid date formats
                continue;
            }
        }
        
        // Update cumulative progress on action plan after all updates
        $actionPlan->updateCumulativeProgress();
    }
    
    /**
     * Calculate KPI metrics for an action plan
     */
    public function calculateKpiMetrics(ActionPlan $actionPlan): JsonResponse
    {
        $metrics = [];
        
        // Rumus 1: Achievement Rate (Cumulative Progress)
        $achievementRate = $actionPlan->cumulative_progress;
        $metrics['achievement_rate'] = [
            'name' => 'Achievement Rate',
            'formula' => 'Average Monthly Progress',
            'value' => $achievementRate,
            'unit' => '%',
            'status' => $this->getKpiStatus($achievementRate, [100, 75, 50])
        ];
        
        // Rumus 2: Yearly Impact Contribution
        $yearlyImpact = $actionPlan->calculateYearlyImpact();
        $metrics['yearly_impact'] = [
            'name' => 'Yearly Impact',
            'formula' => '(Avg Progress) × (Duration / 12)',
            'value' => $yearlyImpact,
            'unit' => '%',
            'status' => $this->getKpiStatus($yearlyImpact, [20, 15, 10]) // Threshold adjusted
        ];
        
        // Rumus 3: Time Efficiency
        // (Cumulative Progress / Expected Progress based on time elapsed) * 100
        $timeEfficiency = 0;
        if ($actionPlan->start_date && $actionPlan->end_date) {
            $totalDuration = $actionPlan->duration_months;
            
            // Calculate elapsed months
            $start = $actionPlan->start_date;
            $now = now();
            
            if ($now < $start) {
                $elapsedMonths = 0;
            } else {
                $elapsedMonths = ($now->year - $start->year) * 12 + ($now->month - $start->month) + 1;
                $elapsedMonths = min($elapsedMonths, $totalDuration);
            }
            
            if ($elapsedMonths > 0) {
                // Expected progress: 100% if time elapsed >= duration
                // Or proportional? Let's assume linear expectation
                // But since we input progress manually, maybe we just compare actual vs expected?
                // Let's keep it simple: if we are 50% through time, we expect 50% progress.
                $expectedProgress = ($elapsedMonths / $totalDuration) * 100;
                $timeEfficiency = $expectedProgress > 0 ? ($achievementRate / $expectedProgress) * 100 : 100;
                $timeEfficiency = min(100, $timeEfficiency);
            }
        }
        
        $metrics['time_efficiency'] = [
            'name' => 'Time Efficiency',
            'formula' => '(Actual Progress / Expected Progress) × 100%',
            'value' => $timeEfficiency,
            'unit' => '%',
            'status' => $this->getKpiStatus($timeEfficiency, [80, 60, 40])
        ];
        
        // Rumus 4: Performance Index
        $performanceIndex = (
            ($achievementRate * 0.6) + 
            ($timeEfficiency * 0.4)
        );
        $metrics['performance_index'] = [
            'name' => 'Performance Index',
            'formula' => '(Achievement × 0.6) + (Time Efficiency × 0.4)',
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
    
    /**
     * Get monthly progress for an action plan
     */
    public function getMonthlyProgress(ActionPlan $actionPlan, int $year = null): JsonResponse
    {
        $year = $year ?? now()->year;
        
        $monthlyProgress = $actionPlan->getMonthlyProgressForYear($year);
        
        return response()->json([
            'action_plan' => $actionPlan,
            'year' => $year,
            'monthly_progress' => $monthlyProgress,
            'total_yearly_impact' => $actionPlan->getTotalYearlyImpactForYear($year)
        ]);
    }
    
    /**
     * Get KPI metrics for all action plans in an initiative
     */
    public function getInitiativeKpiMetrics(Initiative $initiative, int $year = null): JsonResponse
    {
        $year = $year ?? now()->year;
        $actionPlans = $initiative->actionPlans;
        
        $metrics = [];
        $totalYearlyImpact = 0;
        
        foreach ($actionPlans as $actionPlan) {
            $monthlyProgress = $actionPlan->getMonthlyProgressForYear($year);
            $yearlyImpact = $actionPlan->getTotalYearlyImpactForYear($year);
            
            $metrics[] = [
                'action_plan' => $actionPlan,
                'monthly_progress' => $monthlyProgress,
                'yearly_impact' => $yearlyImpact
            ];
            
            $totalYearlyImpact += $yearlyImpact;
        }
        
        return response()->json([
            'initiative' => $initiative,
            'year' => $year,
            'metrics' => $metrics,
            'total_yearly_impact' => $totalYearlyImpact,
            'average_cumulative_progress' => $actionPlans->avg('cumulative_progress')
        ]);
    }
}