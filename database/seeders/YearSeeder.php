<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Year;
use App\Models\Phase;

class YearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $years = [
            [
                'year' => 2026,
                'theme' => 'Accelerating Human Capital Foundation for Operational Excellence',
                'phase_number' => 1
            ],
            [
                'year' => 2027,
                'theme' => 'Strengthening Digital Human Capital Management for Business Expansion',
                'phase_number' => 2
            ],
            [
                'year' => 2028,
                'theme' => 'Empowering Digital Workforce & Systems for Business Expansion and Sustainable Growth',
                'phase_number' => 2
            ],
            [
                'year' => 2029,
                'theme' => 'Accelerating Human Capital Integration for Nation Wide Scale Expansion',
                'phase_number' => 3
            ],
            [
                'year' => 2030,
                'theme' => 'Empowering Workforce Capabilities Through Innovation Breakthrough for Global Readiness',
                'phase_number' => 3
            ]
        ];

        foreach ($years as $yearData) {
            $phase = Phase::where('phase_number', $yearData['phase_number'])->first();
            
            Year::updateOrCreate(
                ['year' => $yearData['year']],
                [
                    'theme' => $yearData['theme'],
                    'phase_id' => $phase ? $phase->id : null
                ]
            );
        }
    }
}
