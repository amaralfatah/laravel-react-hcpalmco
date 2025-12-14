<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InitiativeDependency extends Model
{
    protected $fillable = [
        'initiative_id',
        'depends_on_initiative_id',
        'dependency_type',
        'description'
    ];

    public function initiative()
    {
        return $this->belongsTo(Initiative::class, 'initiative_id');
    }

    public function dependsOnInitiative()
    {
        return $this->belongsTo(Initiative::class, 'depends_on_initiative_id');
    }
}
