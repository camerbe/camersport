<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livematch extends Model
{
    use HasFactory;

    protected $table = 'livematchs';

    protected $fillable = [
        'matchsheet_id', 'team_id', 'player', 'type',
        'description', 'event_minute', 'status','player'
    ];
    protected $casts = [
        'player' => 'array',
    ];
    public function matchsheet()
    {
        return $this->belongsTo(MatchSheet::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
