<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kpi extends Model
{
    protected $fillable = [
        'initiative_id',
        'metric_name',
        'uom',
        'target',
        'actual_value',
        'achievement_percentage',
        'display_order'
    ];

    protected $casts = [
        'achievement_percentage' => 'decimal:2'
    ];

    public function initiative(): BelongsTo
    {
        return $this->belongsTo(Initiative::class);
    }
}
