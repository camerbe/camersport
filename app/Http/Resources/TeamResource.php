<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
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
            'name'=>$this->name,
            'logo'=>$this->logo,
            'images' => $this->whenLoaded('media', function () {
                return $this->getMedia('team')->map(function ($media) {
                    return [
                        'url' => $media->getUrl(),
                        //'thumbnail' => $media->getUrl('thumb'),
                        'mime_type' => $media->mime_type,
                        'extension' => $media->extension,
                        'meta' => $media->custom_properties
                    ];
                });
            }),
        ];
    }
}
