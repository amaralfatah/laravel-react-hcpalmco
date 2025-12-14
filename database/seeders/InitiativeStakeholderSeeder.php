<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\InitiativeStakeholder;
use App\Models\Initiative;

class InitiativeStakeholderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stakeholders = [
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'Director of Human Resources',
                'role' => 'Project Sponsor',
                'department' => 'Human Resources',
                'contact' => 'hr.director@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'HC Transformation Program',
                'description' => 'Comprehensive transformation of human capital processes and systems',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 1,
                'stakeholder_number' => 2,
                'stakeholder_name' => 'IT Director',
                'role' => 'Technical Lead',
                'department' => 'Information Technology',
                'contact' => 'it.director@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'Digital Transformation Manager',
                'role' => 'Project Manager',
                'department' => 'Digital Transformation',
                'contact' => 'digital.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'Digital HR Implementation',
                'description' => 'Implementation of digital HR solutions for process automation',
                'pillar_number' => 1,
                'year' => 2026,
                'initiative_number' => 2,
                'stakeholder_number' => 2,
                'stakeholder_name' => 'HRIS Manager',
                'role' => 'System Owner',
                'department' => 'Human Resources',
                'contact' => 'hris.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'HR Development Manager',
                'role' => 'Program Owner',
                'department' => 'Human Resources',
                'contact' => 'hrd.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'Leadership Development Program',
                'description' => 'Structured leadership development program for managers and supervisors',
                'pillar_number' => 2,
                'year' => 2026,
                'initiative_number' => 1,
                'stakeholder_number' => 2,
                'stakeholder_name' => 'Training Manager',
                'role' => 'Implementation Lead',
                'department' => 'Human Resources',
                'contact' => 'training.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'medium'
            ],
            [
                'title' => 'Talent Management System',
                'description' => 'Implementation of comprehensive talent management system',
                'pillar_number' => 2,
                'year' => 2027,
                'initiative_number' => 2,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'Talent Management Manager',
                'role' => 'Project Owner',
                'department' => 'Human Resources',
                'contact' => 'talent.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'Employee Engagement Enhancement',
                'description' => 'Programs to improve employee engagement and satisfaction',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 1,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'HR Analytics Manager',
                'role' => 'Program Lead',
                'department' => 'Human Resources',
                'contact' => 'analytics.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'Performance Management Optimization',
                'description' => 'Optimization of performance management system and processes',
                'pillar_number' => 3,
                'year' => 2027,
                'initiative_number' => 2,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'Performance Management Manager',
                'role' => 'Process Owner',
                'department' => 'Human Resources',
                'contact' => 'performance.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'Compensation & Benefits Review',
                'description' => 'Comprehensive review and restructuring of compensation and benefits',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 1,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'Compensation & Benefits Manager',
                'role' => 'Project Lead',
                'department' => 'Human Resources',
                'contact' => 'compbenefit.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'Workforce Planning System',
                'description' => 'Implementation of strategic workforce planning system',
                'pillar_number' => 4,
                'year' => 2028,
                'initiative_number' => 2,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'Workforce Planning Manager',
                'role' => 'System Owner',
                'department' => 'Human Resources',
                'contact' => 'workforce.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'HR Analytics Dashboard',
                'description' => 'Development of HR analytics dashboard for data-driven decisions',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 1,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'HR Analytics Manager',
                'role' => 'Dashboard Owner',
                'department' => 'Human Resources',
                'contact' => 'analytics.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ],
            [
                'title' => 'Succession Planning Framework',
                'description' => 'Development and implementation of succession planning framework',
                'pillar_number' => 5,
                'year' => 2029,
                'initiative_number' => 2,
                'stakeholder_number' => 1,
                'stakeholder_name' => 'Talent Management Manager',
                'role' => 'Framework Owner',
                'department' => 'Human Resources',
                'contact' => 'talent.manager@ptpn4-palmco.co.id',
                'involvement_level' => 'high'
            ]
        ];

        foreach ($stakeholders as $stakeholder) {
            $initiative = Initiative::where('title', $stakeholder['title'])
                ->where('pillar_id', function($query) use ($stakeholder) {
                    $query->select('id')
                        ->from('pillars')
                        ->where('pillar_number', $stakeholder['pillar_number']);
                })
                ->where('year', $stakeholder['year'])
                ->where('row_number', $stakeholder['initiative_number'])
                ->first();
            
            if ($initiative) {
                        InitiativeStakeholder::updateOrCreate(
                            [
                                'initiative_id' => $initiative->id,
                                'stakeholder_number' => $stakeholder['stakeholder_number']
                            ],
                            [
                                'stakeholder_name' => $stakeholder['stakeholder_name'],
                                'role' => $stakeholder['role'],
                                'department' => $stakeholder['department'],
                                'contact' => $stakeholder['contact'],
                                'involvement_level' => $stakeholder['involvement_level']
                            ]
                        );
                    }
        }
    }
}
