<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pays extends Model
{
    use HasFactory;

    protected $primaryKey = 'code3';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $casts = [
        'code' => 'string',
    ];

    protected $fillable = [
        'code',
        'pays',
        'country',
        'code3',

    ];
    public static function findByCode(string $code): ?self
    {
        return self::where('code3', $code)->first();
    }

    public function articles():HasMany{
        return $this->hasMany(Article::class);
    }
}
