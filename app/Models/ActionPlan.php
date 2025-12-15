<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ActionPlan extends Model
{
    protected $fillable = [
        'initiative_id',
        'activity_number',
        'activity_name',
        'project_manager_status',
        'start_date',
        'end_date',
        'duration_months',
        'weight_percentage',
        'cumulative_progress',
        'yearly_impact',
        'display_order'
    ];

    protected $casts = [
        'weight_percentage' => 'decimal:2',
        'cumulative_progress' => 'decimal:2',
        'yearly_impact' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date'
    ];

    public function initiative(): BelongsTo
    {
        return $this->belongsTo(Initiative::class);
    }

    public function monthlyProgress(): HasMany
    {
        return $this->hasMany(MonthlyProgress::class);
    }

    /**
     * Calculate duration in months
     */
    public function calculateDurationMonths(): int
    {
        if (!$this->start_date || !$this->end_date) {
            return 0;
        }

        // Hitung selisih bulan + 1 (inklusif)
        // Contoh: Jan - Mar = 2 bulan selisih + 1 = 3 bulan durasi
        $start = $this->start_date;
        $end = $this->end_date;

        // Menggunakan Carbon diffInMonths
        // diffInMonths menghitung selisih penuh, jadi perlu penyesuaian
        // Cara paling aman: (Year2 - Year1) * 12 + (Month2 - Month1) + 1
        $months = ($end->year - $start->year) * 12 + ($end->month - $start->month) + 1;

        return max(1, $months);
    }

    /**
     * Calculate weight percentage based on duration
     */
    public function calculateWeightPercentage(): float
    {
        $duration = $this->calculateDurationMonths();

        // Rumus: Durasi / 12 bulan * 100
        // Max 100% jika durasi >= 12 bulan
        return min(100, ($duration / 12) * 100);
    }

    /**
     * Calculate yearly impact based on monthly contributions
     */
    public function calculateYearlyImpact(): float
    {
        // Sum of all monthly contributions
        return $this->monthlyProgress()->sum('monthly_contribution');
    }

    /**
     * Update cumulative progress based on average of monthly progress
     */
    public function updateCumulativeProgress(): void
    {
        // Cumulative progress = Rata-rata progress bulanan
        $avgProgress = $this->monthlyProgress()->avg('progress') ?? 0;
        $this->cumulative_progress = $avgProgress;
        $this->saveQuietly();
    }

    /**
     * Save the model with calculated fields
     */
    public function save(array $options = [])
    {
        // Calculate duration and weight before saving
        if ($this->start_date && $this->end_date) {
            $this->duration_months = $this->calculateDurationMonths();
            $this->weight_percentage = $this->calculateWeightPercentage();
        }

        return parent::save($options);
    }

    /**
     * Update yearly impact after monthly progress changes
     */
    public function updateYearlyImpact(): void
    {
        $this->yearly_impact = $this->calculateYearlyImpact();
        $this->saveQuietly();
    }

    /**
     * Get monthly progress for a specific year and month
     */
    public function getMonthlyProgressForMonth(int $year, int $month): ?MonthlyProgress
    {
        return $this->monthlyProgress()
            ->where('year', $year)
            ->where('month', $month)
            ->first();
    }

    /**
     * Get all monthly progress for a specific year
     */
    public function getMonthlyProgressForYear(int $year): \Illuminate\Database\Eloquent\Collection
    {
        return $this->monthlyProgress()
            ->where('year', $year)
            ->orderBy('month')
            ->get();
    }

    /**
     * Get total yearly impact for a specific year
     */
    public function getTotalYearlyImpactForYear(int $year): float
    {
        return $this->monthlyProgress()
            ->where('year', $year)
            ->sum('monthly_contribution');
    }
}
