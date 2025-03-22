<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Cache;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Article extends Model  implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'titre',
        'slug',
        'auteur',
        'source',
        'motclef',
        'chapeau',
        'article',
        'image',
        'date_parution',
        'user_id',
        'categorie_id',
        'competition_id',
        'pays_code',

    ];

    protected static function boot(){
        parent::boot();
        Article::created(function($model){
            Cache::forget('article-list');
            Cache::forget('article-findBySlug');
        });
        Article::deleted(function($model){
            Cache::forget('article-list');
            Cache::forget('article-findBySlug');
        });
        Article::updated(function($model){
            Cache::forget('article-list');
            Cache::forget('article-findBySlug');
        });
    }
    /*public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 100, 100)
            ->nonQueued();
    }*/

    public function registerMediaCollections():void{
        $this->addMediaCollection('article')
            ->registerMediaConversions(function(Media $media){
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            } );
        $this
            ->addMediaCollection('article')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }
    public function bled():BelongsTo{
        return $this->belongsTo(Pays::class,'pays_code','code' );
    }
    public function categorie():BelongsTo{
        return $this->belongsTo(Categorie::class);
    }
}
