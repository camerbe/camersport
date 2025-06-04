<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LiveMatchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'description'=>$this->description,
            'event_minute'=>$this->event_minute,
            'event_type'=>$this->event_type,
            'player'=>$this->player,
            'matchsheet_id'=>$this->matchsheet_id,
            'matchsheet'=>new MatchSheetResource($this->matchsheet),
            'status'=>$this->status,
            'team_id'=>$this->team_id,
            'updated_at'=>$this->updated_at,
            'score_a'=>$this->score_a,
            'score_b'=>$this->score_b,

        ];
    }
}
