<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Risk extends Model
{
    protected $fillable = [
        'initiative_id',
        'risk_description',
        'severity',
        'probability',
        'display_order'
    ];

    public function initiative(): BelongsTo
    {
        return $this->belongsTo(Initiative::class);
    }

    public function riskMitigations(): HasMany
    {
        return $this->hasMany(RiskMitigation::class);
    }
}
