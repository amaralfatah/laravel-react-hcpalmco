<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Kpi;
use App\Models\Initiative;

class KpiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kpis = [
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'kpi_number' => 1,
                'kpi_name' => 'Process Automation Rate',
                'target_value' => 80,
                'current_value' => 20,
                'unit' => '%',
                'target_date' => '2026-12-31'
            ],
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'kpi_number' => 2,
                'kpi_name' => 'System Integration Completion',
                'target_value' => 100,
                'current_value' => 25,
                'unit' => '%',
                'target_date' => '2026-12-31'
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'kpi_number' => 1,
                'kpi_name' => 'Digital Platform Adoption',
                'target_value' => 90,
                'current_value' => 10,
                'unit' => '%',
                'target_date' => '2026-09-30'
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'kpi_number' => 1,
                'kpi_name' => 'Leadership Competency Score',
                'target_value' => 85,
                'current_value' => 65,
                'unit' => 'score',
                'target_date' => '2026-11-30'
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'kpi_number' => 2,
                'kpi_name' => 'Leadership Program Completion',
                'target_value' => 100,
                'current_value' => 40,
                'unit' => '%',
                'target_date' => '2026-11-30'
            ],
            [
                'title' => 'Talent Management System',
                'description' => 'Implementation of comprehensive talent management system',
                'pillar_number' => 2,
                'year' => 2027,
                'initiative_number' => 2,
                'kpi_number' => 1,
                'kpi_name' => 'System Implementation',
                'target_value' => 100,
                'current_value' => 0,
                'unit' => '%',
                'target_date' => '2027-06-30'
            ],
            [
                'title' => 'Employee Engagement Enhancement',
                'description' => 'Programs to improve employee engagement and satisfaction',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 1,
                'kpi_number' => 1,
                'kpi_name' => 'Employee Engagement Score',
                'target_value' => 85,
                'current_value' => 72,
                'unit' => 'score',
                'target_date' => '2027-12-31'
            ],
            [
                'title' => 'Performance Management Optimization',
                'description' => 'Optimization of performance management system and processes',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 2,
                'kpi_number' => 1,
                'kpi_name' => 'Performance Review Completion',
                'target_value' => 95,
                'current_value' => 80,
                'unit' => '%',
                'target_date' => '2027-09-30'
            ],
            [
                'title' => 'Compensation & Benefits Review',
                'description' => 'Comprehensive review and restructuring of compensation and benefits',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 1,
                'kpi_number' => 1,
                'kpi_name' => 'Competitive Salary Index',
                'target_value' => 90,
                'current_value' => 75,
                'unit' => 'index',
                'target_date' => '2028-03-31'
            ],
            [
                'title' => 'Workforce Planning System',
                'description' => 'Implementation of strategic workforce planning system',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 2,
                'kpi_number' => 1,
                'kpi_name' => 'Workforce Planning Coverage',
                'target_value' => 100,
                'current_value' => 0,
                'unit' => '%',
                'target_date' => '2028-12-31'
            ],
            [
                'title' => 'HR Analytics Dashboard',
                'description' => 'Development of HR analytics dashboard for data-driven decisions',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 1,
                'kpi_number' => 1,
                'kpi_name' => 'Dashboard Implementation',
                'target_value' => 100,
                'current_value' => 0,
                'unit' => '%',
                'target_date' => '2029-06-30'
            ],
            [
                'title' => 'Succession Planning Framework',
                'description' => 'Development and implementation of succession planning framework',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 2,
                'kpi_number' => 1,
                'kpi_name' => 'Critical Position Coverage',
                'target_value' => 85,
                'current_value' => 60,
                'unit' => '%',
                'target_date' => '2029-12-31'
            ]
        ];

        foreach ($kpis as $kpi) {
            $initiative = Initiative::where('title', $kpi['title'])
                ->where('pillar_id', function($query) use ($kpi) {
                    $query->select('id')
                        ->from('pillars')
                        ->where('pillar_number', $kpi['pillar_number']);
                })
                ->where('year', $kpi['year'])
                ->where('row_number', $kpi['initiative_number'])
                ->first();
            
            if ($initiative) {
                Kpi::updateOrCreate(
                    [
                        'initiative_id' => $initiative->id,
                        'metric_name' => $kpi['kpi_name']
                    ],
                    [
                        'uom' => $kpi['unit'],
                        'target' => $kpi['target_value'],
                        'actual_value' => $kpi['current_value'],
                        'display_order' => $kpi['kpi_number']
                    ]
                );
            }
        }
    }
}
