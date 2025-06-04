<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Team extends Model implements HasMedia
{
    //
    use HasFactory,InteractsWithMedia;
    protected $fillable = ['name', 'logo','slugname'];

    public function registerMediaCollections():void{
        $this->addMediaCollection('team')
            ->registerMediaConversions(function(Media $media){
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            } );
        $this
            ->addMediaCollection('team')
            ->withResponsiveImages();
    }

    public function getImagesAttribute()
    {
        return $this->getMedia('team')->map(function ($media) {
            return [
                'original' => $media->getUrl(),
                'thumb' => $media->getUrl('thumb'), // Conversion
                'properties' => $media->custom_properties,
                'width' => $media->getCustomProperty('width'),
            ];
        });
    }
    public function matchSheet():HasMany{
        return $this->hasMany(Matchsheet::class);
    }
    public static function last(){
        return static::latest()->first();
    }
}
