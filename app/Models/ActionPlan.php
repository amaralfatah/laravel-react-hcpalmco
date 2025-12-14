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
        'current_month_progress',
        'cumulative_progress',
        'current_month',
        'monthly_target',
        'yearly_impact',
        'display_order'
    ];

    protected $casts = [
        'current_month_progress' => 'decimal:2',
        'cumulative_progress' => 'decimal:2',
        'monthly_target' => 'decimal:2',
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
     * Calculate yearly impact based on current month progress
     */
    public function calculateYearlyImpact(): float
    {
        // Rumus: Impact Tahunan = (Progress Bulan Tertentu / 100) × 8.33%
        return ($this->current_month_progress / 100) * 8.33;
    }

    /**
     * Save the model with calculated yearly impact
     */
    public function save(array $options = [])
    {
        // Calculate yearly impact before saving
        $this->yearly_impact = $this->calculateYearlyImpact();
        
        return parent::save($options);
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
            ->sum('yearly_impact');
    }


}
