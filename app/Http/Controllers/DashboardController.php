<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pillar;
use App\Models\Year;
use App\Models\Phase;
use App\Models\Initiative;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboards');
    }

    public function list()
    {
        // Get pillars with their initiatives
        $pillars = Pillar::with(['initiatives' => function($query) {
            $query->orderBy('row_number')->orderBy('year');
        }])->orderBy('pillar_number')->get();
        
        // Get years with their phases
        $years = Year::with('phase')->orderBy('year')->get();
        
        // Get phases
        $phases = Phase::orderBy('phase_number')->get();
        
        // Transform data to match the structure expected by the frontend
        $roadmapData = [];
        foreach ($pillars as $pillar) {
            $pillarData = [
                'pilar' => $pillar->name,
                'no' => $pillar->pillar_number,
                'rows' => []
            ];
            
            // Group initiatives by row_number
            $initiativesByRow = [];
            foreach ($pillar->initiatives as $initiative) {
                $rowNumber = $initiative->row_number;
                if (!isset($initiativesByRow[$rowNumber])) {
                    $initiativesByRow[$rowNumber] = [];
                }
                $initiativesByRow[$rowNumber][] = [
                    'code' => $initiative->code,
                    'year' => $initiative->year,
                    'title' => $initiative->title
                ];
            }
            
            // Sort by row number and create rows structure
            ksort($initiativesByRow);
            foreach ($initiativesByRow as $rowNumber => $items) {
                $pillarData['rows'][] = [
                    'no' => $rowNumber,
                    'items' => $items
                ];
            }
            
            $roadmapData[] = $pillarData;
        }
        
        return Inertia::render('list', [
            'roadmapData' => $roadmapData,
            'years' => $years,
            'phases' => $phases
        ]);
    }

    public function detail(Request $request)
    {
        $initiativeCode = $request->get('code', 'P2.1.1');
        
        $initiative = Initiative::with([
            'pillar', 'year', 'kpis', 'actionPlans', 
            'risks.riskMitigations', 'dependencies', 
            'supportSystems', 'parentingModels'
        ])->where('code', $initiativeCode)->firstOrFail();
        
        // Transform data to match the structure expected by the frontend
        $initiativeData = [
            'code' => $initiative->code,
            'title' => $initiative->title,
            'description' => $initiative->description,
            'pilar' => $initiative->pillar->name,
            'duration' => $initiative->duration_start->format('M Y') . ' - ' . $initiative->duration_end->format('M Y'),
            'pic' => $initiative->pic,
            'budgetType' => $initiative->budget_type,
            'budgetAmount' => $initiative->budget_currency . ' ' . number_format($initiative->budget_amount, 0, ',', '.'),
            'kpis' => $initiative->kpis,
            'actionPlans' => $initiative->actionPlans,
            'risks' => $initiative->risks,
            'riskMitigations' => $initiative->risks->flatMap(function($risk) {
                return $risk->riskMitigations;
            }),
            'dependencies' => $initiative->dependencies,
            'supportSystems' => $initiative->supportSystems,
            'parentingModels' => $initiative->parentingModels
        ];
        
        return Inertia::render('detail', [
            'initiative' => $initiativeData
        ]);
    }
}
