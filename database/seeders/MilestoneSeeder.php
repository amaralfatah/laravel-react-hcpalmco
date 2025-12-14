<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Milestone;
use App\Models\Initiative;

class MilestoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $milestones = [
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'milestone_number' => 1,
                'milestone_name' => 'Process Analysis Complete',
                'description' => 'Complete analysis of all HR processes and create documentation',
                'target_date' => '2026-03-31',
                'status' => 'completed'
            ],
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'milestone_number' => 2,
                'milestone_name' => 'System Integration Plan',
                'description' => 'Complete system integration planning and architecture design',
                'target_date' => '2026-06-30',
                'status' => 'in_progress'
            ],
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'milestone_number' => 3,
                'milestone_name' => 'Pilot Implementation',
                'description' => 'Complete pilot implementation of transformed processes',
                'target_date' => '2026-09-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'milestone_number' => 1,
                'milestone_name' => 'Platform Selection',
                'description' => 'Complete evaluation and selection of digital HR platform',
                'target_date' => '2026-02-28',
                'status' => 'completed'
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'milestone_number' => 2,
                'milestone_name' => 'Platform Configuration',
                'description' => 'Complete configuration of selected digital HR platform',
                'target_date' => '2026-06-30',
                'status' => 'in_progress'
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'milestone_number' => 3,
                'milestone_name' => 'User Training',
                'description' => 'Complete user training for digital HR platform',
                'target_date' => '2026-08-31',
                'status' => 'not_started'
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'milestone_number' => 1,
                'milestone_name' => 'Competency Framework',
                'description' => 'Complete development of leadership competency framework',
                'target_date' => '2026-03-31',
                'status' => 'completed'
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'milestone_number' => 2,
                'milestone_name' => 'Training Program Launch',
                'description' => 'Complete launch of leadership training program',
                'target_date' => '2026-06-30',
                'status' => 'in_progress'
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'milestone_number' => 3,
                'milestone_name' => 'First Cohort Graduation',
                'description' => 'Complete first cohort graduation from leadership program',
                'target_date' => '2026-11-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Talent Management System',
                'description' => 'Implementation of comprehensive talent management system',
                'pillar_number' => 2,
                'year' => 2027,
                'initiative_number' => 2,
                'milestone_number' => 1,
                'milestone_name' => 'Requirements Definition',
                'description' => 'Complete definition of system requirements',
                'target_date' => '2027-02-28',
                'status' => 'not_started'
            ],
            [
                'title' => 'Talent Management System',
                'description' => 'Implementation of comprehensive talent management system',
                'pillar_number' => 2,
                'year' => 2027,
                'initiative_number' => 2,
                'milestone_number' => 2,
                'milestone_name' => 'System Selection',
                'description' => 'Complete selection of talent management system',
                'target_date' => '2027-04-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Talent Management System',
                'description' => 'Implementation of comprehensive talent management system',
                'pillar_number' => 2,
                'year' => 2027,
                'initiative_number' => 2,
                'milestone_number' => 3,
                'milestone_name' => 'System Implementation',
                'description' => 'Complete implementation of talent management system',
                'target_date' => '2027-06-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Employee Engagement Enhancement',
                'description' => 'Programs to improve employee engagement and satisfaction',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 1,
                'milestone_number' => 1,
                'milestone_name' => 'Survey Design',
                'description' => 'Complete design of employee engagement survey',
                'target_date' => '2027-03-31',
                'status' => 'not_started'
            ],
            [
                'title' => 'Employee Engagement Enhancement',
                'description' => 'Programs to improve employee engagement and satisfaction',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 1,
                'milestone_number' => 2,
                'milestone_name' => 'Survey Implementation',
                'description' => 'Complete implementation of employee engagement survey',
                'target_date' => '2027-06-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Employee Engagement Enhancement',
                'description' => 'Programs to improve employee engagement and satisfaction',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 1,
                'milestone_number' => 3,
                'milestone_name' => 'Action Plan Development',
                'description' => 'Complete development of action plans based on survey results',
                'target_date' => '2027-09-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Performance Management Optimization',
                'description' => 'Optimization of performance management system and processes',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 2,
                'milestone_number' => 1,
                'milestone_name' => 'Process Redesign',
                'description' => 'Complete redesign of performance management process',
                'target_date' => '2027-03-31',
                'status' => 'not_started'
            ],
            [
                'title' => 'Performance Management Optimization',
                'description' => 'Optimization of performance management system and processes',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 2,
                'milestone_number' => 2,
                'milestone_name' => 'System Configuration',
                'description' => 'Complete configuration of performance management system',
                'target_date' => '2027-06-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Performance Management Optimization',
                'description' => 'Optimization of performance management system and processes',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 2,
                'milestone_number' => 3,
                'milestone_name' => 'Manager Training',
                'description' => 'Complete training for managers on new performance process',
                'target_date' => '2027-09-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Compensation & Benefits Review',
                'description' => 'Comprehensive review and restructuring of compensation and benefits',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 1,
                'milestone_number' => 1,
                'milestone_name' => 'Market Analysis',
                'description' => 'Complete market benchmark analysis for compensation',
                'target_date' => '2028-02-28',
                'status' => 'not_started'
            ],
            [
                'title' => 'Compensation & Benefits Review',
                'description' => 'Comprehensive review and restructuring of compensation and benefits',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 1,
                'milestone_number' => 2,
                'milestone_name' => 'Structure Redesign',
                'description' => 'Complete redesign of compensation and benefits structure',
                'target_date' => '2028-03-31',
                'status' => 'not_started'
            ],
            [
                'title' => 'Workforce Planning System',
                'description' => 'Implementation of strategic workforce planning system',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 2,
                'milestone_number' => 1,
                'milestone_name' => 'Framework Development',
                'description' => 'Complete development of workforce planning framework',
                'target_date' => '2028-06-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Workforce Planning System',
                'description' => 'Implementation of strategic workforce planning system',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 2,
                'milestone_number' => 2,
                'milestone_name' => 'System Implementation',
                'description' => 'Complete implementation of workforce planning system',
                'target_date' => '2028-12-31',
                'status' => 'not_started'
            ],
            [
                'title' => 'HR Analytics Dashboard',
                'description' => 'Development of HR analytics dashboard for data-driven decisions',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 1,
                'milestone_number' => 1,
                'milestone_name' => 'Requirements Gathering',
                'description' => 'Complete requirements gathering for analytics dashboard',
                'target_date' => '2029-03-31',
                'status' => 'not_started'
            ],
            [
                'title' => 'HR Analytics Dashboard',
                'description' => 'Development of HR analytics dashboard for data-driven decisions',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 1,
                'milestone_number' => 2,
                'milestone_name' => 'Dashboard Development',
                'description' => 'Complete development of HR analytics dashboard',
                'target_date' => '2029-06-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Succession Planning Framework',
                'description' => 'Development and implementation of succession planning framework',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 2,
                'milestone_number' => 1,
                'milestone_name' => 'Critical Position Identification',
                'description' => 'Complete identification of critical positions',
                'target_date' => '2029-06-30',
                'status' => 'not_started'
            ],
            [
                'title' => 'Succession Planning Framework',
                'description' => 'Development and implementation of succession planning framework',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 2,
                'milestone_number' => 2,
                'milestone_name' => 'Framework Implementation',
                'description' => 'Complete implementation of succession planning framework',
                'target_date' => '2029-12-31',
                'status' => 'not_started'
            ]
        ];

        foreach ($milestones as $milestone) {
            $initiative = Initiative::where('title', $milestone['title'])
                ->where('pillar_id', function($query) use ($milestone) {
                    $query->select('id')
                        ->from('pillars')
                        ->where('pillar_number', $milestone['pillar_number']);
                })
                ->where('year', $milestone['year'])
                ->where('row_number', $milestone['initiative_number'])
                ->first();
            
            if ($initiative) {
                Milestone::updateOrCreate(
                    [
                        'initiative_id' => $initiative->id,
                        'milestone_number' => $milestone['milestone_number']
                    ],
                    [
                        'milestone_name' => $milestone['milestone_name'],
                        'description' => $milestone['description'],
                        'target_date' => $milestone['target_date'],
                        'status' => $milestone['status']
                    ]
                );
            }
        }
    }
}
