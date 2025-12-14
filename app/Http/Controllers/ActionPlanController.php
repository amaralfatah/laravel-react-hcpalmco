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
        
        // Business logic validation
        if ($validated['current_month_progress'] > 100) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => [
                    'current_month_progress' => 'Progress cannot exceed 100%'
                ]
            ], 422);
        }
        
        if ($validated['cumulative_progress'] < $validated['current_month_progress']) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => [
                    'cumulative_progress' => 'Cumulative progress must be greater than or equal to current month progress'
                ]
            ], 422);
        }
        
        // Set initiative_id
        $validated['initiative_id'] = $initiative->id;
        
        try {
            // Membuat action plan baru di database
            $actionPlan = ActionPlan::create($validated);
            
            // Membuat atau update catatan progress bulanan untuk bulan ini
            $this->createOrUpdateMonthlyProgress($actionPlan);
            
            // Mengembalikan redirect dengan flash message untuk toast notification
            return back()->with('success', 'Action Plan berhasil dibuat');
        } catch (\Exception $e) {
            // Mengembalikan redirect dengan pesan error
            return back()->with('error', 'Gagal membuat action plan: ' . $e->getMessage());
        }
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
            return response()->json([
                'message' => 'Validation failed',
                'errors' => [
                    'current_month_progress' => 'Progress cannot exceed 100%'
                ]
            ], 422);
        }
        
        if ($validated['cumulative_progress'] < $validated['current_month_progress']) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => [
                    'cumulative_progress' => 'Cumulative progress must be greater than or equal to current month progress'
                ]
            ], 422);
        }
        
        try {
            // Melakukan update action plan di database
            $actionPlan->update($validated);
            
            // Membuat atau update catatan progress bulanan untuk bulan ini
            $this->createOrUpdateMonthlyProgress($actionPlan);
            
            // Update status milestone jika ada relasi milestone
            if ($actionPlan->milestone) {
                $this->updateMilestoneStatus($actionPlan->milestone);
            }
            
            // Mengembalikan redirect dengan flash message untuk toast notification
            return back()->with('success', 'Action Plan berhasil diupdate');
        } catch (\Exception $e) {
            // Mengembalikan redirect dengan pesan error
            return back()->with('error', 'Gagal mengupdate action plan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActionPlan $actionPlan)
    {
        try {
            // Menghapus action plan dari database
            $actionPlan->delete();
            
            // Mengembalikan redirect dengan flash message untuk toast notification
            return back()->with('success', 'Action Plan berhasil dihapus');
        } catch (\Exception $e) {
            // Mengembalikan redirect dengan pesan error
            return back()->with('error', 'Gagal menghapus action plan: ' . $e->getMessage());
        }
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
        if ($actionPlan->end_date) {
            $today = now();
            $endDate = \Carbon\Carbon::parse($actionPlan->end_date);
            $totalDays = $today->diffInDays($endDate, false);
            
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
    
    /**
     * Create or update monthly progress record for current month
     */
    protected function createOrUpdateMonthlyProgress(ActionPlan $actionPlan): void
    {
        $currentYear = now()->year;
        $currentMonth = now()->month;
        
        // Check if monthly progress record already exists
        $monthlyProgress = MonthlyProgress::where('action_plan_id', $actionPlan->id)
            ->where('year', $currentYear)
            ->where('month', $currentMonth)
            ->first();
            
        if (!$monthlyProgress) {
            // Create new monthly progress record
            MonthlyProgress::create([
                'action_plan_id' => $actionPlan->id,
                'year' => $currentYear,
                'month' => $currentMonth,
                'progress' => $actionPlan->current_month_progress,
                'yearly_impact' => $actionPlan->calculateYearlyImpact()
            ]);
        } else {
            // Update existing monthly progress record
            $monthlyProgress->progress = $actionPlan->current_month_progress;
            $monthlyProgress->yearly_impact = $actionPlan->calculateYearlyImpact();
            $monthlyProgress->save();
        }
        
        // Update current_month in action plan
        $actionPlan->current_month = $currentMonth;
        $actionPlan->save();
    }
    
    /**
     * Get monthly progress data for an action plan
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
     * Update monthly progress for a specific month
     */
    public function updateMonthlyProgress(Request $request, ActionPlan $actionPlan, int $year, int $month): JsonResponse
    {
        $validated = $request->validate([
            'progress' => 'required|numeric|min:0|max:100',
            'notes' => 'nullable|string'
        ]);
        
        // Find or create monthly progress record
        $monthlyProgress = MonthlyProgress::firstOrCreate(
            [
                'action_plan_id' => $actionPlan->id,
                'year' => $year,
                'month' => $month
            ],
            [
                'progress' => 0,
                'yearly_impact' => 0
            ]
        );
        
        // Update progress and calculate yearly impact
        $monthlyProgress->progress = $validated['progress'];
        $monthlyProgress->notes = $validated['notes'] ?? null;
        $monthlyProgress->save();
        
        // Update action plan's current_month_progress if this is the current month
        if ($year == now()->year && $month == now()->month) {
            $actionPlan->current_month_progress = $validated['progress'];
            $actionPlan->save();
        }
        
        return response()->json([
            'message' => 'Monthly progress updated successfully',
            'monthly_progress' => $monthlyProgress
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
            'average_monthly_progress' => $actionPlans->avg('current_month_progress'),
            'average_cumulative_progress' => $actionPlans->avg('cumulative_progress')
        ]);
    }
}