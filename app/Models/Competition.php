<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Competition extends Model
{
    use HasFactory;

    protected $fillable = [
        'competition',
        'slugcompetition',

    ];
    public function categories():BelongsToMany{
        return $this->belongsToMany(Categorie::class);
    }
}
