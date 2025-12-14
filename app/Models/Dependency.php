<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dependency extends Model
{
    protected $fillable = [
        'initiative_id',
        'dependency_description',
        'dependency_type',
        'display_order'
    ];

    public function initiative()
    {
        return $this->belongsTo(Initiative::class);
    }
}