<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        'categorie',
        'slugcategorie',

    ];
    public function articles():HasMany{
        return $this->hasMany(Article::class);
    }
    public function competitions():BelongsToMany{
        return $this->belongsToMany(Competition::class);
    }
}
