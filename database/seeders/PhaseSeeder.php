<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Phase;

class PhaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $phases = [
            [
                'phase_number' => 1,
                'title' => 'Solidify the Core',
                'color_class' => 'bg-accent',
                'start_year' => 2026,
                'end_year' => 2026
            ],
            [
                'phase_number' => 2,
                'title' => 'Digital Synergy for Business Expansion and Sustainable Growth',
                'color_class' => 'bg-sidebar-primary',
                'start_year' => 2027,
                'end_year' => 2028
            ],
            [
                'phase_number' => 3,
                'title' => 'Achieving Excellence and Global Readiness',
                'color_class' => 'bg-primary',
                'start_year' => 2029,
                'end_year' => 2030
            ]
        ];

        foreach ($phases as $phase) {
            Phase::updateOrCreate(
                ['phase_number' => $phase['phase_number']],
                $phase
            );
        }
    }
}
