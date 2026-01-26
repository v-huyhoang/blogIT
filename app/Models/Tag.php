<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    /** @use HasFactory<\Database\Factories\TagFactory> */
    use HasFactory, HasSlug;

    protected $fillable = [
        'name',
        'slug',
    ];

    protected static $slugFrom = 'name';

    protected static $slugRouteKey = false;

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_tag')->withTimestamps();
    }

    public function scopeSearch(Builder $query, string $term): void
    {
        $query->where(function ($query) use ($term) {
            $query->where('name', 'like', "%{$term}%")
                ->orWhere('slug', 'like', "%{$term}%");
        });
    }
}
