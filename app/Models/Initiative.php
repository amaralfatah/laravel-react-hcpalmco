<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Initiative extends Model
{
    protected $fillable = [
        'code',
        'title',
        'year',
        'pillar_id',
        'row_number',
        'description',
        'duration_start',
        'duration_end',
        'stream_lead',
        'pic',
        'budget_type',
        'budget_amount',
        'budget_currency',
        'status'
    ];

    protected $casts = [
        'duration_start' => 'date',
        'duration_end' => 'date',
        'budget_amount' => 'decimal:2'
    ];

    public function year(): BelongsTo
    {
        return $this->belongsTo(Year::class, 'year', 'year');
    }

    public function pillar(): BelongsTo
    {
        return $this->belongsTo(Pillar::class);
    }

    public function kpis(): HasMany
    {
        return $this->hasMany(Kpi::class);
    }

    public function actionPlans(): HasMany
    {
        return $this->hasMany(ActionPlan::class);
    }

    public function risks(): HasMany
    {
        return $this->hasMany(Risk::class);
    }

    public function riskMitigations(): HasMany
    {
        return $this->hasMany(RiskMitigation::class);
    }

    public function dependencies(): HasMany
    {
        return $this->hasMany(Dependency::class);
    }

    public function supportSystems(): HasMany
    {
        return $this->hasMany(SupportSystem::class);
    }

    public function parentingModels(): BelongsToMany
    {
        return $this->belongsToMany(ParentingModel::class, 'initiative_parenting');
    }

    public function milestones(): HasMany
    {
        return $this->hasMany(Milestone::class);
    }

    public function stakeholders(): HasMany
    {
        return $this->hasMany(InitiativeStakeholder::class);
    }
}
