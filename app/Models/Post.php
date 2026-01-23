<?php

namespace App\Models;

use App\Enums\PostStatus;
use App\Traits\Filterable;
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use Filterable, HasFactory, HasSlug, SoftDeletes;

    protected static string $slugFrom = 'title';

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'meta_title',
        'meta_description',
        'status',
        'published_at',
    ];

    protected $appends = [
        'status_metadata',
        'image_url',
    ];

    protected array $allowedFilters = [
        'id',
        'user_id',
        'category_id',
        'title',
        'slug',
        'status',
        'published_at',
        'created_at',
        'updated_at',
        'views_count',
        'comments_count',
        'likes_count',
        'deleted_at',
    ];

    protected array $searchable = [
        'title',
        'excerpt',
    ];

    protected function casts(): array
    {
        return [
            'status' => PostStatus::class,
            'published_at' => 'datetime',
        ];
    }

    public function getStatusMetadataAttribute(): array
    {
        return [
            'label' => $this->status->label(),
            'color' => $this->status->color(),
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? Storage::url($this->image) : null;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'post_tag')->withTimestamps();
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }
}
