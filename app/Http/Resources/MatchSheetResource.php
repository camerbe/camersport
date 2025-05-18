<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MatchSheetResource extends JsonResource
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
            'team_a_id'=>$this->team_a_id,
            'team_b_id'=>$this->team_b_id,
            'match_date'=>$this->match_date,
            'matchsheet_id'=>$this->matchsheet_id,
            'formation_a'=>$this->formation_a,
            'formation_b'=>$this->formation_b,
            'color_a'=>$this->color_a,
            'color_b'=>$this->color_b,
            'referee'=>$this->referee,
            'location'=>$this->location,
            'team_a_data'=>$this->team_a_data,
            'team_b_data'=>$this->team_b_data,


        ];
    }
}
