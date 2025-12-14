<?php

namespace Database\Seeders;

use App\Models\ActionPlan;
use App\Models\Initiative;
use App\Models\MonthlyProgress;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ActionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $actionPlans = [
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'action_number' => 1,
                'action_name' => 'Process Analysis and Documentation',
                'description' => 'Analyze existing HR processes and create comprehensive documentation',
                'status' => 'completed',
                'priority' => 'high',
                'assigned_to' => 'HR Process Team',
                'start_date' => '2026-01-01',
                'end_date' => '2026-03-31',
                'progress_percentage' => 100,
            ],
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'action_number' => 2,
                'action_name' => 'System Integration Planning',
                'description' => 'Plan integration between existing HR systems and new platforms',
                'status' => 'in_progress',
                'priority' => 'high',
                'assigned_to' => 'IT Integration Team',
                'start_date' => '2026-04-01',
                'end_date' => '2026-09-30',
                'progress_percentage' => 50,
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'action_number' => 1,
                'action_name' => 'Digital Platform Selection',
                'description' => 'Evaluate and select appropriate digital HR platform',
                'status' => 'completed',
                'priority' => 'high',
                'assigned_to' => 'Digital Transformation Team',
                'start_date' => '2026-01-01',
                'end_date' => '2026-02-28',
                'progress_percentage' => 100,
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'action_number' => 2,
                'action_name' => 'Platform Configuration',
                'description' => 'Configure selected digital HR platform according to requirements',
                'status' => 'in_progress',
                'priority' => 'high',
                'assigned_to' => 'HRIS Team',
                'start_date' => '2026-03-01',
                'end_date' => '2026-08-31',
                'progress_percentage' => 30,
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'action_number' => 1,
                'action_name' => 'Leadership Competency Framework',
                'description' => 'Develop comprehensive leadership competency framework',
                'status' => 'completed',
                'priority' => 'high',
                'assigned_to' => 'HR Development Team',
                'start_date' => '2026-01-01',
                'end_date' => '2026-03-31',
                'progress_percentage' => 100,
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'action_number' => 2,
                'action_name' => 'Leadership Training Implementation',
                'description' => 'Implement leadership training programs based on competency framework',
                'status' => 'in_progress',
                'priority' => 'high',
                'assigned_to' => 'Training Team',
                'start_date' => '2026-04-01',
                'end_date' => '2026-11-30',
                'progress_percentage' => 60,
            ],
            [
                'title' => 'Talent Management System',
                'description' => 'Implementation of comprehensive talent management system',
                'pillar_number' => 2,
                'year' => 2027,
                'initiative_number' => 2,
                'action_number' => 1,
                'action_name' => 'System Requirements Definition',
                'description' => 'Define comprehensive requirements for talent management system',
                'status' => 'planning',
                'priority' => 'high',
                'assigned_to' => 'HRIS Team',
                'start_date' => '2027-01-01',
                'end_date' => '2027-02-28',
                'progress_percentage' => 0,
            ],
            [
                'title' => 'Employee Engagement Enhancement',
                'description' => 'Programs to improve employee engagement and satisfaction',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 1,
                'action_number' => 1,
                'action_name' => 'Engagement Survey Design',
                'description' => 'Design comprehensive employee engagement survey',
                'status' => 'planning',
                'priority' => 'medium',
                'assigned_to' => 'HR Analytics Team',
                'start_date' => '2027-01-01',
                'end_date' => '2027-03-31',
                'progress_percentage' => 0,
            ],
            [
                'title' => 'Performance Management Optimization',
                'description' => 'Optimization of performance management system and processes',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 2,
                'action_number' => 1,
                'action_name' => 'Performance Review Process Redesign',
                'description' => 'Redesign performance review process for better effectiveness',
                'status' => 'planning',
                'priority' => 'high',
                'assigned_to' => 'Performance Management Team',
                'start_date' => '2027-01-01',
                'end_date' => '2027-06-30',
                'progress_percentage' => 0,
            ],
            [
                'title' => 'Compensation & Benefits Review',
                'description' => 'Comprehensive review and restructuring of compensation and benefits',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 1,
                'action_number' => 1,
                'action_name' => 'Market Benchmark Analysis',
                'description' => 'Conduct comprehensive market benchmark analysis for compensation',
                'status' => 'planning',
                'priority' => 'high',
                'assigned_to' => 'Compensation & Benefits Team',
                'start_date' => '2028-01-01',
                'end_date' => '2028-02-28',
                'progress_percentage' => 0,
            ],
            [
                'title' => 'Workforce Planning System',
                'description' => 'Implementation of strategic workforce planning system',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 2,
                'action_number' => 1,
                'action_name' => 'Workforce Planning Framework',
                'description' => 'Develop strategic workforce planning framework',
                'status' => 'planning',
                'priority' => 'high',
                'assigned_to' => 'Workforce Planning Team',
                'start_date' => '2028-01-01',
                'end_date' => '2028-06-30',
                'progress_percentage' => 0,
            ],
            [
                'title' => 'HR Analytics Dashboard',
                'description' => 'Development of HR analytics dashboard for data-driven decisions',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 1,
                'action_number' => 1,
                'action_name' => 'Dashboard Requirements Gathering',
                'description' => 'Gather requirements for HR analytics dashboard',
                'status' => 'planning',
                'priority' => 'medium',
                'assigned_to' => 'HR Analytics Team',
                'start_date' => '2029-01-01',
                'end_date' => '2029-03-31',
                'progress_percentage' => 0,
            ],
            [
                'title' => 'Succession Planning Framework',
                'description' => 'Development and implementation of succession planning framework',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 2,
                'action_number' => 1,
                'action_name' => 'Critical Position Identification',
                'description' => 'Identify critical positions for succession planning',
                'status' => 'planning',
                'priority' => 'high',
                'assigned_to' => 'Talent Management Team',
                'start_date' => '2029-01-01',
                'end_date' => '2029-06-30',
                'progress_percentage' => 0,
            ],
        ];

        foreach ($actionPlans as $actionPlan) {
            $initiative = Initiative::where('title', $actionPlan['title'])
                ->where('pillar_id', function ($query) use ($actionPlan) {
                    $query->select('id')
                        ->from('pillars')
                        ->where('pillar_number', $actionPlan['pillar_number']);
                })
                ->where('year', $actionPlan['year'])
                ->where('row_number', $actionPlan['initiative_number'])
                ->first();

            if ($initiative) {
                $actionPlanModel = ActionPlan::updateOrCreate(
                    [
                        'initiative_id' => $initiative->id,
                        'activity_number' => $actionPlan['action_number'],
                    ],
                    [
                        'activity_name' => $actionPlan['action_name'],
                        'project_manager_status' => $actionPlan['status'] === 'completed' ? 'green' : ($actionPlan['status'] === 'in_progress' ? 'yellow' : 'blue'),
                        'start_date' => $actionPlan['start_date'],
                        'end_date' => $actionPlan['end_date'],
                        'cumulative_progress' => $actionPlan['progress_percentage'],
                        'display_order' => $actionPlan['action_number'],
                    ]
                );

                // Create MonthlyProgress to back it up
                if ($actionPlan['progress_percentage'] > 0) {
                    $startDate = Carbon::parse($actionPlan['start_date']);
                    MonthlyProgress::updateOrCreate(
                        [
                            'action_plan_id' => $actionPlanModel->id,
                            'year' => $startDate->year,
                            'month' => $startDate->month,
                        ],
                        [
                            'progress' => $actionPlan['progress_percentage'],
                        ]
                    );
                }

                // Trigger calculations
                $actionPlanModel->calculateDurationMonths();
                $actionPlanModel->calculateWeightPercentage();
                $actionPlanModel->updateCumulativeProgress();
                $actionPlanModel->save();
            }
        }
    }
}
