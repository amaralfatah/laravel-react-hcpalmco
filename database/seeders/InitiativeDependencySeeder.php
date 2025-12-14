<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dependency;
use App\Models\Initiative;

class InitiativeDependencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dependencies = [
            [
                'initiative_title' => 'Talent Management System',
                'initiative_pillar' => 2,
                'initiative_year' => 2027,
                'initiative_number' => 2,
                'depends_on_title' => 'Leadership Development Program',
                'depends_on_pillar' => 2,
                'depends_on_year' => 2026,
                'depends_on_number' => 1,
                'dependency_type' => 'sequential',
                'description' => 'Leadership development program must be established before implementing talent management system'
            ],
            [
                'initiative_title' => 'Employee Engagement Enhancement',
                'initiative_pillar' => 3,
                'initiative_year' => 2027,
                'initiative_number' => 1,
                'depends_on_title' => 'Leadership Development Program',
                'depends_on_pillar' => 2,
                'depends_on_year' => 2026,
                'depends_on_number' => 1,
                'dependency_type' => 'related',
                'description' => 'Leadership development improves employee engagement'
            ],
            [
                'initiative_title' => 'Performance Management Optimization',
                'initiative_pillar' => 3,
                'initiative_year' => 2027,
                'initiative_number' => 2,
                'depends_on_title' => 'Talent Management System',
                'depends_on_pillar' => 2,
                'depends_on_year' => 2027,
                'depends_on_number' => 2,
                'dependency_type' => 'sequential',
                'description' => 'Talent management system must be in place before optimizing performance management'
            ],
            [
                'initiative_title' => 'Workforce Planning System',
                'initiative_pillar' => 4,
                'initiative_year' => 2028,
                'initiative_number' => 2,
                'depends_on_title' => 'Talent Management System',
                'depends_on_pillar' => 2,
                'depends_on_year' => 2027,
                'depends_on_number' => 2,
                'dependency_type' => 'sequential',
                'description' => 'Talent management system provides data for workforce planning'
            ],
            [
                'initiative_title' => 'HR Analytics Dashboard',
                'initiative_pillar' => 5,
                'initiative_year' => 2029,
                'initiative_number' => 1,
                'depends_on_title' => 'Workforce Planning System',
                'depends_on_pillar' => 4,
                'depends_on_year' => 2028,
                'depends_on_number' => 2,
                'dependency_type' => 'sequential',
                'description' => 'Workforce planning data is essential for HR analytics dashboard'
            ],
            [
                'initiative_title' => 'Succession Planning Framework',
                'initiative_pillar' => 5,
                'initiative_year' => 2029,
                'initiative_number' => 2,
                'depends_on_title' => 'Talent Management System',
                'depends_on_pillar' => 2,
                'depends_on_year' => 2027,
                'depends_on_number' => 2,
                'dependency_type' => 'related',
                'description' => 'Talent management system supports succession planning'
            ],
            [
                'initiative_title' => 'Digital HR Platform Phase 2',
                'initiative_pillar' => 1,
                'initiative_year' => 2027,
                'initiative_number' => 1,
                'depends_on_title' => 'Digital HR Platform Phase 1',
                'depends_on_pillar' => 1,
                'depends_on_year' => 2026,
                'depends_on_number' => 3,
                'dependency_type' => 'sequential',
                'description' => 'Phase 1 must be completed before starting Phase 2'
            ]
        ];

        foreach ($dependencies as $dependency) {
            $initiative = Initiative::where('title', $dependency['initiative_title'])
                ->where('pillar_id', function($query) use ($dependency) {
                    $query->select('id')
                        ->from('pillars')
                        ->where('pillar_number', $dependency['initiative_pillar']);
                })
                ->where('year', $dependency['initiative_year'])
                ->where('row_number', $dependency['initiative_number'])
                ->first();
            
            $dependsOn = Initiative::where('title', $dependency['depends_on_title'])
                ->where('pillar_id', function($query) use ($dependency) {
                    $query->select('id')
                        ->from('pillars')
                        ->where('pillar_number', $dependency['depends_on_pillar']);
                })
                ->where('year', $dependency['depends_on_year'])
                ->where('row_number', $dependency['depends_on_number'])
                ->first();
            
            if ($initiative && $dependsOn) {
                Dependency::updateOrCreate(
                    [
                        'initiative_id' => $initiative->id,
                        'dependency_description' => 'Depends on: ' . $dependsOn->title . ' - ' . $dependency['description']
                    ],
                    [
                        'dependency_type' => $dependency['dependency_type'] === 'sequential' ? 'internal' : ($dependency['dependency_type'] === 'related' ? 'cross_functional' : 'external'),
                        'display_order' => 1
                    ]
                );
            }
        }
    }
}
