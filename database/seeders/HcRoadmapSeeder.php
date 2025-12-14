<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Phase;
use App\Models\Year;
use App\Models\Pillar;
use App\Models\Initiative;
use App\Models\Kpi;
use App\Models\ActionPlan;
use App\Models\Risk;
use App\Models\RiskMitigation;
use App\Models\Dependency;
use App\Models\SupportSystem;
use App\Models\ParentingModel;
use App\Models\MonthlyProgress;

use Carbon\Carbon;

class HcRoadmapSeeder extends Seeder
{
    public function run()
    {
        $this->command->info('🌱 Seeding HC Roadmap data...');
        
        // Seed Master Data
        $this->command->info('📋 Seeding Phases...');
        $this->seedPhases();
        
        $this->command->info('📅 Seeding Years...');
        $this->seedYears();
        
        $this->command->info('🏛️ Seeding Pillars...');
        $this->seedPillars();
        
        $this->command->info('🔄 Seeding Parenting Models...');
        $this->seedParentingModels();
        
        // Seed Initiatives
        $this->command->info('💼 Seeding Pillar 1 Initiatives...');
        $this->seedPillar1Initiatives();
        
        $this->command->info('📚 Seeding Pillar 2 Initiatives...');
        $this->seedPillar2Initiatives();
        
        // Seed Detail Data for ALL Initiatives
        $this->command->info('🔍 Seeding Detail Data for All Initiatives...');
        $this->seedAllInitiativesDetailData();
        
        $this->command->info('✅ HC Roadmap seeding completed!');
    }

    private function seedPhases()
    {
        $phases = [
            [
                'phase_number' => 1,
                'title' => 'Solidify the Core',
                'color_class' => 'bg-accent',
                'start_year' => 2026,
                'end_year' => 2026,
            ],
            [
                'phase_number' => 2,
                'title' => 'Digital Synergy for Business Expansion and Sustainable Growth',
                'color_class' => 'bg-sidebar-primary',
                'start_year' => 2027,
                'end_year' => 2028,
            ],
            [
                'phase_number' => 3,
                'title' => 'Achieving Excellence and Global Readiness',
                'color_class' => 'bg-primary',
                'start_year' => 2029,
                'end_year' => 2030,
            ],
        ];

        foreach ($phases as $phase) {
            Phase::updateOrCreate(
                ['phase_number' => $phase['phase_number']],
                $phase
            );
        }
    }

    private function seedYears()
    {
        $phase1 = Phase::where('phase_number', 1)->first();
        $phase2 = Phase::where('phase_number', 2)->first();
        $phase3 = Phase::where('phase_number', 3)->first();

        $years = [
            [
                'year' => 2026,
                'theme' => 'Accelerating Human Capital Foundation for Operational Excellence',
                'phase_id' => $phase1->id,
            ],
            [
                'year' => 2027,
                'theme' => 'Strengthening Digital Human Capital Management for Business Expansion',
                'phase_id' => $phase2->id,
            ],
            [
                'year' => 2028,
                'theme' => 'Empowering Digital Workforce & Systems for Business Expansion and Sustainable Growth',
                'phase_id' => $phase2->id,
            ],
            [
                'year' => 2029,
                'theme' => 'Accelerating Human Capital Integration for Nation Wide Scale Expansion',
                'phase_id' => $phase3->id,
            ],
            [
                'year' => 2030,
                'theme' => 'Empowering Workforce Capabilities Through Innovation Breakthrough for Global Readiness',
                'phase_id' => $phase3->id,
            ],
        ];

        foreach ($years as $year) {
            Year::updateOrCreate(
                ['year' => $year['year']],
                $year
            );
        }
    }

    private function seedPillars()
    {
        $pillars = [
            [
                'pillar_number' => 1,
                'name' => 'Strategy & Corporate Culture',
                'description' => 'Strategic initiatives focused on organizational culture, structure, and strategic alignment',
                'display_order' => 1,
            ],
            [
                'pillar_number' => 2,
                'name' => 'Learning & Leadership Development',
                'description' => 'Initiatives focused on capability building, learning systems, and leadership development',
                'display_order' => 2,
            ],
        ];

        foreach ($pillars as $pillar) {
            Pillar::updateOrCreate(
                ['pillar_number' => $pillar['pillar_number']],
                $pillar
            );
        }
    }

    private function seedParentingModels()
    {
        $models = [
            [
                'name' => 'Sentralisasi',
                'description' => 'Centralized decision making and control',
                'color_class' => 'bg-blue-600',
                'display_order' => 1,
            ],
            [
                'name' => 'Koordinasi',
                'description' => 'Coordinated approach across units',
                'color_class' => 'bg-yellow-400',
                'display_order' => 2,
            ],
            [
                'name' => 'Desentralisasi',
                'description' => 'Decentralized autonomy for units',
                'color_class' => 'bg-green-600',
                'display_order' => 3,
            ],
        ];

        foreach ($models as $model) {
            ParentingModel::updateOrCreate(
                ['name' => $model['name']],
                $model
            );
        }
    }

    private function seedPillar1Initiatives()
    {
        $pillar1 = Pillar::where('pillar_number', 1)->first();

        $initiatives = [
            // Row 1
            ['code' => 'P1.1.1', 'title' => 'Integrated Human Capital Management Implementation Alignment', 'year' => 2026, 'row_number' => 1],
            ['code' => 'P1.2.1', 'title' => 'Organizational Alignment for Operational Excellence & Business Expansion', 'year' => 2027, 'row_number' => 1],
            ['code' => 'P1.3.1', 'title' => 'Established Culture Governance & Standardized Cultural Practices Across Units', 'year' => 2028, 'row_number' => 1],
            ['code' => 'P1.4.1', 'title' => 'Digital Culture Transformation for Sustainable Growth', 'year' => 2029, 'row_number' => 1],
            ['code' => 'P1.5.1', 'title' => 'Global Innovation and Culture Excellence', 'year' => 2030, 'row_number' => 1],
            
            // Row 2
            ['code' => 'P1.1.2', 'title' => 'Corporate Strategy Alignment & Structure Optimization', 'year' => 2026, 'row_number' => 2],
            ['code' => 'P1.2.2', 'title' => 'Digital Strategic Alignment & HCBP Deployment', 'year' => 2027, 'row_number' => 2],
            ['code' => 'P1.3.2', 'title' => 'Harmonized Digital Culture Practices Across the Organization', 'year' => 2028, 'row_number' => 2],
            ['code' => 'P1.4.2', 'title' => 'Agile Organization for Business Excellence', 'year' => 2029, 'row_number' => 2],
            ['code' => 'P1.5.2', 'title' => 'Strategic Partnership and Ecosystem Development', 'year' => 2030, 'row_number' => 2],
            
            // Row 3
            ['code' => 'P1.1.3', 'title' => 'Culture Foundation and Change Management', 'year' => 2026, 'row_number' => 3],
            ['code' => 'P1.2.3', 'title' => 'Strengthened Organization Structure (Shared Service and Digital Organization)', 'year' => 2027, 'row_number' => 3],
            ['code' => 'P1.3.3', 'title' => 'Digital adoption & innovation to enable business expansion', 'year' => 2028, 'row_number' => 3],
            ['code' => 'P1.4.3', 'title' => 'HC Change Enablement & Adoption Excellence', 'year' => 2029, 'row_number' => 3],
            ['code' => 'P1.5.3', 'title' => 'Talent Mobility and Knowledge Management', 'year' => 2030, 'row_number' => 3],
            
            // Row 4
            ['code' => 'P1.1.4', 'title' => 'Digital Readiness Assessment', 'year' => 2026, 'row_number' => 4],
            ['code' => 'P1.2.4', 'title' => 'Strengthened Organization Structure (Agile Organization)', 'year' => 2027, 'row_number' => 4],
            ['code' => 'P1.3.4', 'title' => 'Winning Culture for Global Competitiveness', 'year' => 2028, 'row_number' => 4],
            ['code' => 'P1.4.4', 'title' => 'Digital Transformation Excellence', 'year' => 2029, 'row_number' => 4],
            ['code' => 'P1.5.4', 'title' => 'Future-Ready Workforce Architecture', 'year' => 2030, 'row_number' => 4],
            
            // Row 5
            ['code' => 'P1.1.5', 'title' => 'Performance Management Integration', 'year' => 2026, 'row_number' => 5],
            ['code' => 'P1.2.5', 'title' => 'Strengthened Organization Structure (Organization Excellence Validation)', 'year' => 2027, 'row_number' => 5],
            ['code' => 'P1.3.5', 'title' => 'Continuous transformation & world-class competitiveness', 'year' => 2028, 'row_number' => 5],
            ['code' => 'P1.4.5', 'title' => 'Operational Excellence and Scalability', 'year' => 2029, 'row_number' => 5],
            ['code' => 'P1.5.5', 'title' => 'Global Talent and Innovation Ecosystem', 'year' => 2030, 'row_number' => 5],
        ];

        foreach ($initiatives as $initiative) {
            Initiative::updateOrCreate(
                ['code' => $initiative['code']],
                array_merge($initiative, ['pillar_id' => $pillar1->id])
            );
        }
    }

    private function seedPillar2Initiatives()
    {
        $pillar2 = Pillar::where('pillar_number', 2)->first();

        $initiatives = [
            // Row 1
            ['code' => 'P2.1.1', 'title' => 'Foundational Capability Acceleration', 'year' => 2026, 'row_number' => 1],
            ['code' => 'P2.2.1', 'title' => 'Digital Learning Readiness', 'year' => 2027, 'row_number' => 1],
            ['code' => 'P2.3.1', 'title' => 'Enhanced HC Team Capability', 'year' => 2028, 'row_number' => 1],
            ['code' => 'P2.4.1', 'title' => 'Leadership Excellence and Succession Planning', 'year' => 2029, 'row_number' => 1],
            ['code' => 'P2.5.1', 'title' => 'Global Leadership Development Program', 'year' => 2030, 'row_number' => 1],
            
            // Row 2
            ['code' => 'P2.1.2', 'title' => 'Strategic Skills & Certification', 'year' => 2026, 'row_number' => 2],
            ['code' => 'P2.2.2', 'title' => 'LMS Implementation & Content Digitalization', 'year' => 2027, 'row_number' => 2],
            ['code' => 'P2.3.2', 'title' => 'HC Business Partner Plantation Foundation', 'year' => 2028, 'row_number' => 2],
            ['code' => 'P2.4.2', 'title' => 'Advanced Leadership Analytics', 'year' => 2029, 'row_number' => 2],
            ['code' => 'P2.5.2', 'title' => 'Executive Coaching and Mentorship', 'year' => 2030, 'row_number' => 2],
            
            // Row 3
            ['code' => 'P2.1.3', 'title' => 'Integrated Productivity Learning Program', 'year' => 2026, 'row_number' => 3],
            ['code' => 'P2.2.3', 'title' => 'Integrated Digital Learning System', 'year' => 2027, 'row_number' => 3],
            ['code' => 'P2.3.3', 'title' => 'Advanced HCBP Plantation Capability', 'year' => 2028, 'row_number' => 3],
            ['code' => 'P2.4.3', 'title' => 'Talent Development and Career Pathing', 'year' => 2029, 'row_number' => 3],
            ['code' => 'P2.5.3', 'title' => 'Innovation and Entrepreneurship Program', 'year' => 2030, 'row_number' => 3],
            
            // Row 4
            ['code' => 'P2.1.4', 'title' => 'Competency & Career Integration', 'year' => 2026, 'row_number' => 4],
            ['code' => 'P2.2.4', 'title' => 'AI-Enabled Learning Analytics', 'year' => 2027, 'row_number' => 4],
            ['code' => 'P2.3.4', 'title' => 'Data-Driven HCBP Plantation', 'year' => 2028, 'row_number' => 4],
            ['code' => 'P2.4.4', 'title' => 'Skills Gap Analysis and Development', 'year' => 2029, 'row_number' => 4],
            ['code' => 'P2.5.4', 'title' => 'Continuous Learning Culture', 'year' => 2030, 'row_number' => 4],
            
            // Row 5
            ['code' => 'P2.1.5', 'title' => 'Future Skills for Global Readiness', 'year' => 2026, 'row_number' => 5],
            ['code' => 'P2.2.5', 'title' => 'Next-Gen Learning Experience', 'year' => 2027, 'row_number' => 5],
            ['code' => 'P2.3.5', 'title' => 'Advanced HCBP Plantation Capability', 'year' => 2028, 'row_number' => 5],
            ['code' => 'P2.4.5', 'title' => 'Knowledge Management System', 'year' => 2029, 'row_number' => 5],
            ['code' => 'P2.5.5', 'title' => 'Digital Learning Innovation Hub', 'year' => 2030, 'row_number' => 5],
        ];

        foreach ($initiatives as $initiative) {
            Initiative::updateOrCreate(
                ['code' => $initiative['code']],
                array_merge($initiative, ['pillar_id' => $pillar2->id])
            );
        }
    }

    private function seedAllInitiativesDetailData()
    {
        $initiatives = Initiative::all();
        $progressBar = $this->command->getOutput()->createProgressBar(count($initiatives));
        $progressBar->start();

        foreach ($initiatives as $initiative) {
            // Special detailed data for P2.1.1 (example with real data)
            if ($initiative->code === 'P2.1.1') {
                $this->seedP211SpecificData($initiative);
            } else {
                // Generic data for all other initiatives
                $this->seedGenericInitiativeData($initiative);
            }
            $progressBar->advance();
        }

        $progressBar->finish();
        $this->command->newLine();
    }

    private function seedP211SpecificData($initiative)
    {
        // Update with specific P2.1.1 data
        $initiative->update([
            'description' => 'Program penguatan kapabilitas karyawan dan lini pengawasan melalui finalisasi peta kompetensi, penyusunan kurikulum pembelajaran berbasis kompetensi (role-based), serta implementasi pelatihan untuk meningkatkan kesiapan organisasi menghadapi tuntutan produktivitas dan transformasi perusahaan dengan tujuan meningkatnya kompetensi kerja, keseragaman standar peran, peningkatan produktivitas, dan terciptanya budaya kinerja kuat.',
            'duration_start' => '2026-01-01',
            'duration_end' => '2026-12-31',
            'stream_lead' => 'Stream Lead',
            'pic' => 'Kasubdiv Pengembangan SDM',
            'budget_type' => 'OPEX',
            'budget_amount' => 1000000000,
            'budget_currency' => 'IDR',
            'status' => 'in_progress',
        ]);

        // KPIs
        $kpis = [
            ['metric_name' => 'CLI Karpel', 'uom' => '%', 'target' => '100% Terlaksana', 'display_order' => 1],
            ['metric_name' => 'Jumlah modul pelatihan teknis yang selesai', 'uom' => 'Modul', 'target' => '> 24 modul prioritas', 'display_order' => 2],
            ['metric_name' => 'Jam pelatihan Mandor I', 'uom' => 'Hours', 'target' => '> 20 JPL/Orang', 'display_order' => 3],
        ];
        foreach ($kpis as $kpi) {
            Kpi::updateOrCreate(
                ['initiative_id' => $initiative->id, 'display_order' => $kpi['display_order']],
                array_merge($kpi, ['initiative_id' => $initiative->id])
            );
        }

        // Action Plans
        $actionPlans = [
            ['activity_number' => 1, 'activity_name' => 'Pembentukan Struktur PalmCo Knowledge Management Center', 'project_manager_status' => 'blue', 'progress' => 8.00, 'cumulative_progress' => 92.00, 'display_order' => 1, 'start_date' => '2026-01-01', 'end_date' => '2026-03-31'],
            ['activity_number' => 2, 'activity_name' => 'Pengukuran CLI Karyawan Pelaksana Bidang Keuangan dan Personalia', 'project_manager_status' => 'green', 'progress' => 0.00, 'cumulative_progress' => 100.00, 'display_order' => 2, 'start_date' => '2026-01-01', 'end_date' => '2026-03-31'],
            ['activity_number' => 3, 'activity_name' => 'Penyusunan kurikulum pembelajaran berbasis kompetensi (role-based learning path)', 'project_manager_status' => 'blue', 'progress' => 12.00, 'cumulative_progress' => 68.00, 'display_order' => 3, 'start_date' => '2026-01-01', 'end_date' => '2026-06-30'],
            ['activity_number' => 4, 'activity_name' => 'Pelaksanaan Supervisory Bootcamp (Mandor I)', 'project_manager_status' => 'green', 'progress' => 18.00, 'cumulative_progress' => 42.00, 'display_order' => 4, 'start_date' => '2026-04-01', 'end_date' => '2026-09-30'],
            ['activity_number' => 5, 'activity_name' => 'Digitalisasi Pembelajaran dan Evaluasi Pembelajaran', 'project_manager_status' => 'yellow', 'progress' => 6.00, 'cumulative_progress' => 38.00, 'display_order' => 5, 'start_date' => '2026-07-01', 'end_date' => '2026-12-31'],
            ['activity_number' => 6, 'activity_name' => 'Pengukuran CLI Karyawan Pelaksana Bidang Tanaman dan Tekpol', 'project_manager_status' => 'green', 'progress' => 3.00, 'cumulative_progress' => 15.00, 'display_order' => 6, 'start_date' => '2026-10-01', 'end_date' => '2026-12-31'],
        ];
        
        $currentYear = now()->year;
        $currentMonth = now()->month;

        foreach ($actionPlans as $plan) {
            // Remove progress from plan array for ActionPlan creation
            $planData = $plan;
            unset($planData['progress']);

            $actionPlan = ActionPlan::updateOrCreate(
                ['initiative_id' => $initiative->id, 'activity_number' => $plan['activity_number']],
                array_merge($planData, ['initiative_id' => $initiative->id])
            );
            
            // Create monthly progress for current month
            MonthlyProgress::updateOrCreate(
                [
                    'action_plan_id' => $actionPlan->id,
                    'year' => $currentYear,
                    'month' => $currentMonth
                ],
                [
                    'progress' => $plan['progress']
                ]
            );
            
            // Create sample monthly progress for previous months of this year
            for ($month = 1; $month < $currentMonth; $month++) {
                // Generate random progress between 0-100
                $randomProgress = rand(0, 100);
                
                MonthlyProgress::updateOrCreate(
                    [
                        'action_plan_id' => $actionPlan->id,
                        'year' => $currentYear,
                        'month' => $month
                    ],
                    [
                        'progress' => $randomProgress
                    ]
                );
            }

            // Trigger calculations
            $actionPlan->calculateDurationMonths();
            $actionPlan->calculateWeightPercentage();
            $actionPlan->updateCumulativeProgress();
            $actionPlan->save();
        }

        // Risks
        $risks = [
            ['risk_description' => 'Resistensi dari lini operasional akibat perubahan program pembelajaran', 'severity' => 'high', 'probability' => 'medium', 'display_order' => 1],
            ['risk_description' => 'Keterbatasan instruktur internal pada unit kebun/pabrik', 'severity' => 'medium', 'probability' => 'high', 'display_order' => 2],
            ['risk_description' => 'Keterbatasan waktu peserta untuk mengikuti pelatihan', 'severity' => 'medium', 'probability' => 'high', 'display_order' => 3],
            ['risk_description' => 'Ketidaksiapan data kompetensi yang terintegrasi', 'severity' => 'high', 'probability' => 'medium', 'display_order' => 4],
        ];
        foreach ($risks as $risk) {
            Risk::updateOrCreate(
                ['initiative_id' => $initiative->id, 'display_order' => $risk['display_order']],
                array_merge($risk, ['initiative_id' => $initiative->id])
            );
        }

        // Risk Mitigations
        $mitigations = [
            ['mitigation_description' => 'Sosialisasi intensif manfaat kurikulum baru ke Regional', 'status' => 'in_progress', 'display_order' => 1],
            ['mitigation_description' => 'Team of Trainer bagi Trainer regional untuk melatih Karyawan', 'status' => 'in_progress', 'display_order' => 2],
            ['mitigation_description' => 'Penjadwalan pelatihan secara terstruktur dan fleksibel', 'status' => 'planned', 'display_order' => 3],
            ['mitigation_description' => 'Komitmen Penggunaan Aplikasi Pengembangan SDM', 'status' => 'planned', 'display_order' => 4],
        ];
        
        // Get all risks for this initiative to associate with mitigations
        $risks = Risk::where('initiative_id', $initiative->id)->get();
        
        foreach ($mitigations as $index => $mitigation) {
            // Associate each mitigation with a risk (cycle through risks if needed)
            $riskId = $risks[$index % $risks->count()]->id;
            
            RiskMitigation::updateOrCreate(
                ['risk_id' => $riskId, 'display_order' => $mitigation['display_order']],
                [
                    'risk_id' => $riskId,
                    'initiative_id' => $initiative->id,
                    'mitigation_description' => $mitigation['mitigation_description'],
                    'status' => $mitigation['status'],
                    'display_order' => $mitigation['display_order'],
                ]
            );
        }

        // Dependencies
        $dependencies = [
            ['dependency_description' => 'Seluruh Divisi PTPN IV', 'dependency_type' => 'internal', 'display_order' => 1],
            ['dependency_description' => 'Bagian SDM dan Sistem Manajemen Regional dan Anper', 'dependency_type' => 'internal', 'display_order' => 2],
            ['dependency_description' => 'PT LPP Agro Nusantara dan Learning Partner PTPN IV lainnya', 'dependency_type' => 'external', 'display_order' => 3],
        ];
        foreach ($dependencies as $dependency) {
            Dependency::updateOrCreate(
                ['initiative_id' => $initiative->id, 'display_order' => $dependency['display_order']],
                array_merge($dependency, ['initiative_id' => $initiative->id])
            );
        }

        // Support Systems
        $supportSystems = [
            ['system_description' => 'Integrated LMS—PALMS (LinkedIn Learning, AgroNow, PALAPA)', 'system_type' => 'technology', 'display_order' => 1],
            ['system_description' => 'Anggaran Pengembangan SDM', 'system_type' => 'budget', 'display_order' => 2],
            ['system_description' => 'Resources (Modul, Lokasi Pelaksanaan)', 'system_type' => 'resource', 'display_order' => 3],
            ['system_description' => 'Trainer/Narasumber Internal dan Eksternal', 'system_type' => 'human_resource', 'display_order' => 4],
            ['system_description' => 'Tim fasilitator internal dan master trainer', 'system_type' => 'human_resource', 'display_order' => 5],
            ['system_description' => 'Dukungan komunikasi internal (sosialisasi ke seluruh unit)', 'system_type' => 'communication', 'display_order' => 6],
        ];
        foreach ($supportSystems as $system) {
            SupportSystem::updateOrCreate(
                ['initiative_id' => $initiative->id, 'display_order' => $system['display_order']],
                array_merge($system, ['initiative_id' => $initiative->id])
            );
        }

        // Link all parenting models
        $parentingModels = ParentingModel::all();
        foreach ($parentingModels as $model) {
            DB::table('initiative_parenting')->updateOrInsert(
                ['initiative_id' => $initiative->id, 'parenting_model_id' => $model->id],
                ['created_at' => now()]
            );
        }
    }

    private function seedGenericInitiativeData($initiative)
    {
        // Calculate year-based duration
        $year = $initiative->year;
        $startDate = Carbon::create($year, 1, 1);
        $endDate = Carbon::create($year, 12, 31);

        // Generate budget based on year (increasing over time)
        $baseBudget = 500000000; // 500M base
        $yearMultiplier = ($year - 2025) * 200000000; // +200M per year
        $budgetAmount = $baseBudget + $yearMultiplier;

        // Determine PIC based on pillar
        $pic = $initiative->pillar->pillar_number == 1 
            ? 'Kasubdiv Strategi & Budaya Korporat' 
            : 'Kasubdiv Pengembangan SDM';

        // Update initiative with generic data
        $initiative->update([
            'description' => "Inisiatif strategis {$initiative->title} bertujuan untuk mendukung pencapaian target organisasi melalui implementasi program yang terstruktur dan terukur. Program ini dirancang untuk meningkatkan kapabilitas dan kesiapan organisasi dalam menghadapi tantangan bisnis serta mendorong transformasi digital yang berkelanjutan.",
            'duration_start' => $startDate->format('Y-m-d'),
            'duration_end' => $endDate->format('Y-m-d'),
            'stream_lead' => 'Stream Lead HC',
            'pic' => $pic,
            'budget_type' => rand(0, 1) ? 'OPEX' : 'CAPEX',
            'budget_amount' => $budgetAmount,
            'budget_currency' => 'IDR',
            'status' => $year <= 2026 ? 'in_progress' : 'planning',
        ]);

        // Generate 3 generic KPIs
        $kpiTemplates = [
            ['metric_name' => 'Tingkat penyelesaian program', 'uom' => '%', 'target' => '≥ 90%'],
            ['metric_name' => 'Indeks kepuasan stakeholder', 'uom' => 'Score', 'target' => '≥ 4.0/5.0'],
            ['metric_name' => 'Jumlah peserta yang terlatih', 'uom' => 'Orang', 'target' => '≥ 100 orang'],
        ];
        foreach ($kpiTemplates as $index => $kpi) {
            Kpi::updateOrCreate(
                ['initiative_id' => $initiative->id, 'display_order' => $index + 1],
                array_merge($kpi, ['initiative_id' => $initiative->id])
            );
        }

        // Generate 4 generic action plans
        $quarters = [
            ['name' => 'Fase Perencanaan & Desain', 'months' => 'Jan-Mar ' . $year, 'status' => 'blue', 'progress' => 15, 'start_date' => $year . '-01-01', 'end_date' => $year . '-03-31'],
            ['name' => 'Fase Implementasi Awal', 'months' => 'Apr-Jun ' . $year, 'status' => 'green', 'progress' => 35, 'start_date' => $year . '-04-01', 'end_date' => $year . '-06-30'],
            ['name' => 'Fase Implementasi Lanjutan', 'months' => 'Jul-Sep ' . $year, 'status' => 'yellow', 'progress' => 30, 'start_date' => $year . '-07-01', 'end_date' => $year . '-09-30'],
            ['name' => 'Fase Evaluasi & Penutupan', 'months' => 'Okt-Des ' . $year, 'status' => 'green', 'progress' => 20, 'start_date' => $year . '-10-01', 'end_date' => $year . '-12-31'],
        ];
        
        $cumulativeProgress = 0;
        foreach ($quarters as $index => $quarter) {
            $cumulativeProgress += $quarter['progress'];
            $actionPlanModel = ActionPlan::updateOrCreate(
                ['initiative_id' => $initiative->id, 'activity_number' => $index + 1],
                [
                    'initiative_id' => $initiative->id,
                    'activity_number' => $index + 1,
                    'activity_name' => $quarter['name'],
                    'project_manager_status' => $quarter['status'],
                    'start_date' => $quarter['start_date'],
                    'end_date' => $quarter['end_date'],
                    'cumulative_progress' => $cumulativeProgress,
                    'display_order' => $index + 1,
                ]
            );

            // Create MonthlyProgress
            if ($quarter['progress'] > 0) {
                $startDate = Carbon::parse($quarter['start_date']);
                MonthlyProgress::updateOrCreate(
                    [
                        'action_plan_id' => $actionPlanModel->id,
                        'year' => $startDate->year,
                        'month' => $startDate->month
                    ],
                    [
                        'progress' => $quarter['progress']
                    ]
                );
            }

            // Trigger calculations
            $actionPlanModel->calculateDurationMonths();
            $actionPlanModel->calculateWeightPercentage();
            $actionPlanModel->updateCumulativeProgress();
            $actionPlanModel->save();
        }

        // Generate 3-4 generic risks
        $riskTemplates = [
            ['desc' => 'Keterbatasan sumber daya untuk implementasi program', 'severity' => 'medium', 'probability' => 'medium'],
            ['desc' => 'Resistensi terhadap perubahan dari stakeholder', 'severity' => 'high', 'probability' => 'medium'],
            ['desc' => 'Keterlambatan jadwal implementasi', 'severity' => 'medium', 'probability' => 'high'],
            ['desc' => 'Ketidaksesuaian sistem dengan kebutuhan operasional', 'severity' => 'high', 'probability' => 'low'],
        ];
        foreach ($riskTemplates as $index => $risk) {
            Risk::updateOrCreate(
                ['initiative_id' => $initiative->id, 'display_order' => $index + 1],
                [
                    'initiative_id' => $initiative->id,
                    'risk_description' => $risk['desc'],
                    'severity' => $risk['severity'],
                    'probability' => $risk['probability'],
                    'display_order' => $index + 1,
                ]
            );
        }

        // Generate risk mitigations
        $mitigationTemplates = [
            ['desc' => 'Alokasi resource yang memadai sejak awal proyek', 'status' => 'planned'],
            ['desc' => 'Program change management dan sosialisasi intensif', 'status' => 'in_progress'],
            ['desc' => 'Monitoring progress secara berkala dan proaktif', 'status' => 'in_progress'],
            ['desc' => 'Melakukan UAT dan pilot testing sebelum rollout', 'status' => 'planned'],
        ];
        
        // Get all risks for this initiative to associate with mitigations
        $risks = Risk::where('initiative_id', $initiative->id)->get();
        
        foreach ($mitigationTemplates as $index => $mitigation) {
            // Associate each mitigation with a risk (cycle through risks if needed)
            $riskId = $risks[$index % $risks->count()]->id;
            
            RiskMitigation::updateOrCreate(
                ['risk_id' => $riskId, 'display_order' => $index + 1],
                [
                    'risk_id' => $riskId,
                    'initiative_id' => $initiative->id,
                    'mitigation_description' => $mitigation['desc'],
                    'status' => $mitigation['status'],
                    'display_order' => $index + 1,
                ]
            );
        }

        // Generate dependencies
        $dependencyTemplates = [
            ['desc' => 'Divisi Human Capital PTPN IV', 'type' => 'internal'],
            ['desc' => 'Tim IT dan Digital Transformation', 'type' => 'internal'],
            ['desc' => 'Regional dan Unit Operasional', 'type' => 'internal'],
            ['desc' => 'Vendor dan Partner Eksternal', 'type' => 'external'],
        ];
        foreach ($dependencyTemplates as $index => $dep) {
            Dependency::updateOrCreate(
                ['initiative_id' => $initiative->id, 'display_order' => $index + 1],
                [
                    'initiative_id' => $initiative->id,
                    'dependency_description' => $dep['desc'],
                    'dependency_type' => $dep['type'],
                    'display_order' => $index + 1,
                ]
            );
        }

        // Generate support systems
        $supportTemplates = [
            ['desc' => 'Sistem Informasi Human Capital Management', 'type' => 'technology'],
            ['desc' => 'Budget dan alokasi anggaran yang memadai', 'type' => 'budget'],
            ['desc' => 'Tim project management dan fasilitator', 'type' => 'human_resource'],
            ['desc' => 'Infrastruktur IT dan platform digital', 'type' => 'technology'],
            ['desc' => 'Dukungan manajemen dan komitmen leadership', 'type' => 'resource'],
        ];
        foreach ($supportTemplates as $index => $support) {
            SupportSystem::updateOrCreate(
                ['initiative_id' => $initiative->id, 'display_order' => $index + 1],
                [
                    'initiative_id' => $initiative->id,
                    'system_description' => $support['desc'],
                    'system_type' => $support['type'],
                    'display_order' => $index + 1,
                ]
            );
        }

        // Link parenting models (generic: assign based on row_number pattern)
        $parentingModels = ParentingModel::all();
        
        // Row 1-2: Sentralisasi
        // Row 3: Koordinasi
        // Row 4-5: Desentralisasi
        $parentingToAssign = [];
        if ($initiative->row_number <= 2) {
            $parentingToAssign = $parentingModels->whereIn('name', ['Sentralisasi'])->pluck('id');
        } elseif ($initiative->row_number == 3) {
            $parentingToAssign = $parentingModels->whereIn('name', ['Koordinasi'])->pluck('id');
        } else {
            $parentingToAssign = $parentingModels->whereIn('name', ['Desentralisasi'])->pluck('id');
        }

        foreach ($parentingToAssign as $modelId) {
            DB::table('initiative_parenting')->updateOrInsert(
                ['initiative_id' => $initiative->id, 'parenting_model_id' => $modelId],
                ['created_at' => now()]
            );
        }
    }
}