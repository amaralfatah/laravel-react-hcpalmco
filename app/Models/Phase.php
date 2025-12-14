<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Phase extends Model
{
    protected $fillable = [
        'phase_number',
        'title',
        'color_class',
        'start_year',
        'end_year'
    ];

    public function years(): HasMany
    {
        return $this->hasMany(Year::class);
    }
}
