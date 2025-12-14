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
        'yearly_impact',
        'notes'
    ];

    protected $casts = [
        'progress' => 'decimal:2',
        'yearly_impact' => 'decimal:2'
    ];

    /**
     * Calculate yearly impact based on monthly progress
     */
    public function calculateYearlyImpact(): float
    {
        // Rumus: Impact Tahunan = (Progress Bulan Tertentu / 100) × 8.33%
        return ($this->progress / 100) * 8.33;
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