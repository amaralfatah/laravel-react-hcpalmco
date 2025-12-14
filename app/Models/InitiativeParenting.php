<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InitiativeParenting extends Model
{
    protected $fillable = [
        'initiative_id',
        'parenting_model_id'
    ];

    public function initiative(): BelongsTo
    {
        return $this->belongsTo(Initiative::class);
    }

    public function parentingModel(): BelongsTo
    {
        return $this->belongsTo(ParentingModel::class);
    }
}
