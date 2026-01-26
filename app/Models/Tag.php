<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use Filterable;
    /** @use HasFactory<\Database\Factories\TagFactory> */
    use HasFactory;

    use HasSlug;

    protected $searchable = [
        'name',
    ];

    protected $fillable = [
        'name',
    ];

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_tag')->withTimestamps();
    }
}
