<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportSystem extends Model
{
    use HasFactory;

    protected $fillable = [
        'initiative_id',
        'system_description',
        'system_type',
        'display_order'
    ];

    public function initiative()
    {
        return $this->belongsTo(Initiative::class);
    }
}