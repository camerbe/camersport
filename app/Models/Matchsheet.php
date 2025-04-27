<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matchsheet extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'match_date',
        'location',
        'team_a_name',
        'team_b_name',
        'formation',
    ];

    protected $casts = [
        'team_a_data' => 'array',
        'team_b_data' => 'array',
        'coaching_staff' => 'array',
    ];
    public static function last(){
        return static::latest()->first();
    }
}
