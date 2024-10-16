<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
    use HasFactory;

    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }
    public function bled():BelongsTo{
        return $this->belongsTo(Pays::class);
    }
    public function categories():BelongsTo{
        return $this->belongsTo(Categorie::class);
    }
}
