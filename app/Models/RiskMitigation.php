<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskMitigation extends Model
{
    use HasFactory;

    protected $fillable = [
        'risk_id',
        'initiative_id',
        'mitigation_description',
        'status',
        'display_order'
    ];

    public function risk()
    {
        return $this->belongsTo(Risk::class);
    }

    public function initiative()
    {
        return $this->belongsTo(Initiative::class);
    }
}