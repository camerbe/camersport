<?php

namespace App\Models;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livematch extends Model implements ShouldBroadcast
{
    use BroadcastsEvents,HasFactory;

    protected $table = 'livematchs';

    protected $fillable = [
        'matchsheet_id', 'team_id', 'player', 'type','event_type','score_a','score_b',
        'description', 'event_minute', 'status','player'
    ];
    protected $casts = [
        'player' => 'array',
    ];
    public function matchsheet()
    {
        return $this->belongsTo(Matchsheet::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('livematchs'),
        ];
    }
    public function broadcastAs($event)
    {
        return match($event) {
            'created' => 'LivematchCreated',
            'updated' => 'LivematchUpdated',
            'deleted' => 'LivematchDeleted',
            default => 'LivematchEvent'
        };
    }
    public function broadcastWith()
    {
        return [
            'livematch' => $this->toArray(),
            'timestamp' => now()->toISOString()
        ];
    }

}
