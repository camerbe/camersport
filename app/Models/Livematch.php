<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livematch extends Model
{
    use HasFactory;

    protected $table = 'livematchs';

    protected $fillable = [
        'team1',
        'team2',
        'event_type'
    ];
    protected $casts = [
        'event_type' => 'json',
    ];
}
