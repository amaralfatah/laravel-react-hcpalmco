<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Initiative;
use App\Models\Pillar;
use App\Models\Year;

class InitiativeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $initiatives = [
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'status' => 'in_progress',
                'budget_type' => 'capex',
                'budget_amount' => 500000000,
                'progress_percentage' => 25,
                'target_completion_date' => '2026-12-31',
                'parent_id' => null
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'status' => 'planning',
                'budget_type' => 'capex',
                'budget_amount' => 300000000,
                'progress_percentage' => 10,
                'target_completion_date' => '2026-09-30',
                'parent_id' => null
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'status' => 'in_progress',
                'budget_type' => 'opex',
                'budget_amount' => 150000000,
                'progress_percentage' => 40,
                'target_completion_date' => '2026-11-30',
                'parent_id' => null
            ],
            [
                'title' => 'Talent Management System',
                'description' => 'Implementation of comprehensive talent management system',
                'pillar_number' => 2,
                'year' => 2027,
                'initiative_number' => 2,
                'status' => 'planning',
                'budget_type' => 'capex',
                'budget_amount' => 250000000,
                'progress_percentage' => 0,
                'target_completion_date' => '2027-06-30',
                'parent_id' => null
            ],
            [
                'title' => 'Employee Engagement Enhancement',
                'description' => 'Programs to improve employee engagement and satisfaction',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 1,
                'status' => 'planning',
                'budget_type' => 'opex',
                'budget_amount' => 100000000,
                'progress_percentage' => 0,
                'target_completion_date' => '2027-12-31',
                'parent_id' => null
            ],
            [
                'title' => 'Performance Management Optimization',
                'description' => 'Optimization of performance management system and processes',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 2,
                'status' => 'planning',
                'budget_type' => 'opex',
                'budget_amount' => 75000000,
                'progress_percentage' => 0,
                'target_completion_date' => '2027-09-30',
                'parent_id' => null
            ],
            [
                'title' => 'Compensation & Benefits Review',
                'description' => 'Comprehensive review and restructuring of compensation and benefits',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 1,
                'status' => 'planning',
                'budget_type' => 'opex',
                'budget_amount' => 200000000,
                'progress_percentage' => 0,
                'target_completion_date' => '2028-03-31',
                'parent_id' => null
            ],
            [
                'title' => 'Workforce Planning System',
                'description' => 'Implementation of strategic workforce planning system',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 2,
                'status' => 'planning',
                'budget_type' => 'capex',
                'budget_amount' => 180000000,
                'progress_percentage' => 0,
                'target_completion_date' => '2028-12-31',
                'parent_id' => null
            ],
            [
                'title' => 'HR Analytics Dashboard',
                'description' => 'Development of HR analytics dashboard for data-driven decisions',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 1,
                'status' => 'planning',
                'budget_type' => 'capex',
                'budget_amount' => 120000000,
                'progress_percentage' => 0,
                'target_completion_date' => '2029-06-30',
                'parent_id' => null
            ],
            [
                'title' => 'Succession Planning Framework',
                'description' => 'Development and implementation of succession planning framework',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 2,
                'status' => 'planning',
                'budget_type' => 'opex',
                'budget_amount' => 80000000,
                'progress_percentage' => 0,
                'target_completion_date' => '2029-12-31',
                'parent_id' => null
            ],
            [
                'title' => 'Digital HR Platform Phase 1',
                'description' => 'First phase of digital HR platform implementation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 3,
                'status' => 'planning',
                'budget_type' => 'capex',
                'budget_amount' => 200000000,
                'progress_percentage' => 0,
                'target_completion_date' => '2026-08-31',
                'parent_id' => 2 // Child of Digital HR Implementation
            ],
            [
                'title' => 'Digital HR Platform Phase 2',
                'description' => 'Second phase of digital HR platform implementation',
                'pillar_number' => 1,
                'year' => 2027,
                'initiative_number' => 1,
                'status' => 'planning',
                'budget_type' => 'capex',
                'budget_amount' => 150000000,
                'progress_percentage' => 0,
                'target_completion_date' => '2027-12-31',
                'parent_id' => 2 // Child of Digital HR Implementation
            ]
        ];

        foreach ($initiatives as $initiative) {
            $pillar = Pillar::where('pillar_number', $initiative['pillar_number'])->first();
            $year = Year::where('year', $initiative['year'])->first();
            
            $code = 'INIT-' . $year->year . '-' . $pillar->pillar_number . '-' . str_pad($initiative['initiative_number'], 2, '0', STR_PAD_LEFT);
            
            Initiative::updateOrCreate(
                ['code' => $code],
                [
                    'title' => $initiative['title'],
                    'description' => $initiative['description'],
                    'pillar_id' => $pillar->id,
                    'year' => $year->year,
                    'row_number' => $initiative['initiative_number'],
                    'status' => $initiative['status'],
                    'budget_type' => strtoupper($initiative['budget_type']),
                    'budget_amount' => $initiative['budget_amount'],
                    'duration_start' => null,
                    'duration_end' => $initiative['target_completion_date'],
                    'stream_lead' => null,
                    'pic' => null
                ]
            );
        }
    }
}
