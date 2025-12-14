<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MonthlyProgress extends Model
{
    protected $fillable = [
        'action_plan_id',
        'year',
        'month',
        'progress',
        'target_progress',
        'monthly_contribution',
        'notes'
    ];

    protected $casts = [
        'progress' => 'decimal:2',
        'target_progress' => 'decimal:2',
        'monthly_contribution' => 'decimal:2'
    ];

    /**
     * Calculate monthly contribution based on progress and action plan weight
     */
    public function calculateMonthlyContribution(): float
    {
        // Rumus: (Progress Bulan Ini / 100) * (Weight Percentage / 100) * 100
        // Atau: (Progress Bulan Ini / 100) * Weight Percentage
        // Tapi weight percentage sudah dalam persen (misal 25), jadi hasilnya dalam persen
        
        // Ambil weight percentage dari action plan
        // Jika belum ada relasi, return 0
        if (!$this->actionPlan) {
            return 0;
        }
        
        // Weight percentage misal 25% (untuk 3 bulan)
        // Progress misal 50%
        // Kontribusi = 50% * 25% = 12.5%
        // Tapi rumus yang disepakati: (Progress / Durasi) * (1/12) * 100
        // Yang sama dengan: Progress * (1/Durasi) * (1/12) * 100
        // Weight Percentage = (Durasi / 12) * 100
        
        // Tunggu, rumus yang disepakati di plan revisi:
        // Yearly Impact = (Rata-rata Progress Bulanan) × (Durasi / 12)
        // Jadi monthly_contribution di sini mungkin lebih baik merepresentasikan kontribusi bulan ini terhadap RATA-RATA
        
        // TAPI, untuk memudahkan query sum, kita bisa pakai pendekatan:
        // Kontribusi Bulan Ini = (Progress Bulan Ini / Durasi) * (Durasi/12) = Progress Bulan Ini / 12
        // JIKA kita menjumlahkan semua bulan, hasilnya: (Sum Progress / Durasi) * (Durasi/12) = Avg Progress * Weight
        
        // Mari kita gunakan rumus: Kontribusi = (Progress / 100) * (1/12) * 100 = Progress / 12
        // Dengan asumsi nanti di-sum lalu dibagi durasi? TIDAK.
        
        // Mari kembali ke rumus revisi:
        // Yearly Impact = (Rata-rata Progress Bulanan) × (Durasi / 12)
        
        // Jadi monthly_contribution di database ini sebaiknya menyimpan apa?
        // Jika kita ingin `sum('monthly_contribution')` menghasilkan Yearly Impact, maka:
        // Sum(Monthly Contribution) = Avg(Progress) * (Durasi/12)
        // Sum(Monthly Contribution) = (Sum(Progress) / Durasi) * (Durasi/12)
        // Sum(Monthly Contribution) = Sum(Progress) / 12
        
        // JADI: Monthly Contribution = Progress / 12
        // Contoh:
        // Bulan 1: 50%. Kontribusi = 50/12 = 4.166%
        // Bulan 2: 100%. Kontribusi = 100/12 = 8.333%
        // Bulan 3: 100%. Kontribusi = 100/12 = 8.333%
        // Total = 20.83%
        
        // Cek rumus manual:
        // Avg Progress = (50+100+100)/3 = 83.33%
        // Durasi = 3 bulan. Weight = 3/12 = 25%
        // Yearly Impact = 83.33% * 25% = 20.83%
        
        // MATCH! Jadi rumusnya sederhana: Progress / 12
        
        return $this->progress / 12;
    }

    /**
     * Save the model with calculated monthly contribution
     */
    public function save(array $options = [])
    {
        // Calculate monthly contribution before saving
        $this->monthly_contribution = $this->calculateMonthlyContribution();
        
        $saved = parent::save($options);
        
        // Update cumulative progress on parent action plan
        if ($this->actionPlan) {
            $this->actionPlan->updateCumulativeProgress();
        }
        
        return $saved;
    }

    public function actionPlan(): BelongsTo
    {
        return $this->belongsTo(ActionPlan::class);
    }

    /**
     * Get month name in Indonesian
     */
    public function getMonthNameAttribute(): string
    {
        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        
        return $months[$this->month] ?? '';
    }

    /**
     * Get formatted year-month
     */
    public function getYearMonthAttribute(): string
    {
        return $this->year . '-' . str_pad($this->month, 2, '0', STR_PAD_LEFT);
    }
}