<?php

namespace App\Events;

use App\Models\Livematch;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LiveMatchUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Livematch $livematch)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('livematchs'),
        ];
    }
    public function broadcastAs(): string
    {
        return 'LivematchUpdated';
    }
    public function broadcastWith(): array
    {
        return [
            'livematch' => $this->livematch->toArray(),
            'timestamp' => now()->toISOString()
        ];
    }
}
