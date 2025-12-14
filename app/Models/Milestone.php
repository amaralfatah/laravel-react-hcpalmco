<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    protected $fillable = [
        'initiative_id',
        'milestone_number',
        'milestone_name',
        'description',
        'target_date',
        'status'
    ];

    public function initiative()
    {
        return $this->belongsTo(Initiative::class);
    }
}
