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
        'team_a_id',
        'team_b_id',
        'formation_a',
        'formation_b',
        'coach_a',
        'coach_b',
        'color_a',
        'color_b',
        'referee',

    ];

    protected $casts = [
        'team_a_data' => 'array',
        'team_b_data' => 'array',

    ];
    public function teamA()
    {
        return $this->belongsTo(Team::class, 'team_a_id');
    }

    public function teamB()
    {
        return $this->belongsTo(Team::class, 'team_b_id');
    }
    public static function last(){
        return static::latest()->first();
    }
}
