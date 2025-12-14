<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pillar;

class PillarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pillars = [
            [
                'pillar_number' => 1,
                'name' => 'Strategy & Corporate Culture',
                'description' => 'Strategic alignment and corporate culture development initiatives',
                'display_order' => 1
            ],
            [
                'pillar_number' => 2,
                'name' => 'Learning & Leadership Development',
                'description' => 'Learning programs and leadership development initiatives',
                'display_order' => 2
            ],
            [
                'pillar_number' => 3,
                'name' => 'Talent Acquisition & Management',
                'description' => 'Talent acquisition, recruitment, and management strategies',
                'display_order' => 3
            ],
            [
                'pillar_number' => 4,
                'name' => 'Performance & Reward Management',
                'description' => 'Performance evaluation systems and reward structures',
                'display_order' => 4
            ],
            [
                'pillar_number' => 5,
                'name' => 'Digital HR & Analytics',
                'description' => 'Digital transformation of HR processes and analytics implementation',
                'display_order' => 5
            ]
        ];

        foreach ($pillars as $pillar) {
            Pillar::updateOrCreate(
                ['pillar_number' => $pillar['pillar_number']],
                $pillar
            );
        }
    }
}
