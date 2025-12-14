<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Risk;
use App\Models\Initiative;

class RiskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $risks = [
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'risk_number' => 1,
                'risk_name' => 'Resistance to Change',
                'description' => 'Employee resistance to new processes and systems',
                'probability' => 'medium',
                'impact' => 'high',
                'mitigation_plan' => 'Comprehensive change management program and stakeholder engagement',
                'risk_owner' => 'Change Management Team'
            ],
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'risk_number' => 2,
                'risk_name' => 'System Integration Issues',
                'description' => 'Technical challenges in integrating existing systems with new platforms',
                'probability' => 'medium',
                'impact' => 'medium',
                'mitigation_plan' => 'Thorough testing and phased implementation approach',
                'risk_owner' => 'IT Integration Team'
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'risk_number' => 1,
                'risk_name' => 'Platform Scalability',
                'description' => 'Selected platform may not scale with organizational growth',
                'probability' => 'low',
                'impact' => 'high',
                'mitigation_plan' => 'Detailed scalability assessment and vendor guarantees',
                'risk_owner' => 'Digital Transformation Team'
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'risk_number' => 1,
                'risk_name' => 'Low Participation Rate',
                'description' => 'Insufficient participation from target leaders',
                'probability' => 'medium',
                'impact' => 'medium',
                'mitigation_plan' => 'Management endorsement and incentive program',
                'risk_owner' => 'HR Development Team'
            ],
            [
                'title' => 'Talent Management System',
                'description' => 'Implementation of comprehensive talent management system',
                'pillar_number' => 2,
                'year' => 2027,
                'initiative_number' => 2,
                'risk_number' => 1,
                'risk_name' => 'Budget Overrun',
                'description' => 'Implementation costs exceeding allocated budget',
                'probability' => 'medium',
                'impact' => 'high',
                'mitigation_plan' => 'Detailed budget tracking and phased implementation',
                'risk_owner' => 'Finance Team'
            ],
            [
                'title' => 'Employee Engagement Enhancement',
                'description' => 'Programs to improve employee engagement and satisfaction',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 1,
                'risk_number' => 1,
                'risk_name' => 'Survey Fatigue',
                'description' => 'Employees experiencing survey fatigue leading to low response rates',
                'probability' => 'medium',
                'impact' => 'medium',
                'mitigation_plan' => 'Strategic survey timing and concise survey design',
                'risk_owner' => 'HR Analytics Team'
            ],
            [
                'title' => 'Performance Management Optimization',
                'description' => 'Optimization of performance management system and processes',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 2,
                'risk_number' => 1,
                'risk_name' => 'Manager Buy-in',
                'description' => 'Insufficient buy-in from managers for new performance processes',
                'probability' => 'high',
                'impact' => 'high',
                'mitigation_plan' => 'Manager involvement in design process and comprehensive training',
                'risk_owner' => 'Performance Management Team'
            ],
            [
                'title' => 'Compensation & Benefits Review',
                'description' => 'Comprehensive review and restructuring of compensation and benefits',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 1,
                'risk_number' => 1,
                'risk_name' => 'Market Volatility',
                'description' => 'Significant market changes affecting compensation benchmarks',
                'probability' => 'medium',
                'impact' => 'medium',
                'mitigation_plan' => 'Regular market monitoring and flexible compensation structure',
                'risk_owner' => 'Compensation & Benefits Team'
            ],
            [
                'title' => 'Workforce Planning System',
                'description' => 'Implementation of strategic workforce planning system',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 2,
                'risk_number' => 1,
                'risk_name' => 'Data Accuracy',
                'description' => 'Inaccurate workforce data leading to poor planning decisions',
                'probability' => 'medium',
                'impact' => 'high',
                'mitigation_plan' => 'Data validation processes and regular audits',
                'risk_owner' => 'Workforce Planning Team'
            ],
            [
                'title' => 'HR Analytics Dashboard',
                'description' => 'Development of HR analytics dashboard for data-driven decisions',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 1,
                'risk_number' => 1,
                'risk_name' => 'Data Integration Challenges',
                'description' => 'Difficulties integrating data from multiple HR systems',
                'probability' => 'high',
                'impact' => 'medium',
                'mitigation_plan' => 'Data standardization and phased integration approach',
                'risk_owner' => 'HR Analytics Team'
            ],
            [
                'title' => 'Succession Planning Framework',
                'description' => 'Development and implementation of succession planning framework',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 2,
                'risk_number' => 1,
                'risk_name' => 'Talent Pool Limitations',
                'description' => 'Insufficient internal talent pool for critical positions',
                'probability' => 'medium',
                'impact' => 'high',
                'mitigation_plan' => 'Talent development programs and external recruitment strategy',
                'risk_owner' => 'Talent Management Team'
            ]
        ];

        foreach ($risks as $risk) {
            $initiative = Initiative::where('title', $risk['title'])
                ->where('pillar_id', function($query) use ($risk) {
                    $query->select('id')
                        ->from('pillars')
                        ->where('pillar_number', $risk['pillar_number']);
                })
                ->where('year', $risk['year'])
                ->where('row_number', $risk['initiative_number'])
                ->first();
            
            if ($initiative) {
                Risk::updateOrCreate(
                    [
                        'initiative_id' => $initiative->id,
                        'risk_description' => $risk['risk_name'] . ': ' . $risk['description']
                    ],
                    [
                        'severity' => $risk['impact'],
                        'probability' => $risk['probability'],
                        'display_order' => $risk['risk_number']
                    ]
                );
            }
        }
    }
}
