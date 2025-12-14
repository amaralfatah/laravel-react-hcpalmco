<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InitiativeStakeholder extends Model
{
    protected $fillable = [
        'initiative_id',
        'stakeholder_number',
        'stakeholder_name',
        'role',
        'department',
        'contact',
        'involvement_level'
    ];

    public function initiative()
    {
        return $this->belongsTo(Initiative::class);
    }
}