<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pillar extends Model
{
    protected $fillable = [
        'pillar_number',
        'name',
        'description',
        'display_order'
    ];

    public function initiatives(): HasMany
    {
        return $this->hasMany(Initiative::class);
    }
}
