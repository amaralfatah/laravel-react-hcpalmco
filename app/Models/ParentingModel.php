<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentingModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'color_class',
        'display_order'
    ];

    public function initiatives()
    {
        return $this->belongsToMany(Initiative::class, 'initiative_parenting')
            ->withPivot('display_order')
            ->withTimestamps();
    }
}