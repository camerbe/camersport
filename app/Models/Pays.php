<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pays extends Model
{
    use HasFactory;

    protected $primaryKey = 'code';

    protected $fillable = [
        'code',
        'pays',
        'country',
        'code3',

    ];
    public function articles():HasMany{
        return $this->hasMany(Article::class);
    }
}
