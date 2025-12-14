<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActionPlan extends Model
{
    protected $fillable = [
        'initiative_id',
        'activity_number',
        'activity_name',
        'project_manager_status',
        'due_date',
        'current_month_progress',
        'cumulative_progress',
        'display_order'
    ];

    protected $casts = [
        'current_month_progress' => 'decimal:2',
        'cumulative_progress' => 'decimal:2'
    ];

    public function initiative(): BelongsTo
    {
        return $this->belongsTo(Initiative::class);
    }
}
