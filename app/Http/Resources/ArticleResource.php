<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
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
            'hit'=>$this->hit,
            'titre'=>$this->titre,
            'slug'=>$this->slug,
            'auteur'=>$this->auteur,
            'source'=>$this->source,
            'motclef'=>$this->motclef,
            'chapeau'=>$this->chapeau,
            'article'=>$this->article,
            'image'=>$this->image,
            'date_parution'=>$this->date_parution,
            'pays_code'=>$this->pays_code,
            'user'=>new UserResource($this->user),
            'pays'=>new PaysResource($this->bled),
            'categorie'=> new CategorieResource($this->categorie),
            'images' => $this->whenLoaded('media', function () {
                return $this->getMedia('article')->map(function ($media) {
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
