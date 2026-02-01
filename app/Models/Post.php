<?php

namespace App\Models;

use App\Enums\PostStatus;
use App\Traits\Filterable;
use App\Traits\HasSlug;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
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
        'is_featured',
        'published_at',
        'publish_at',
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
        'is_featured',
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
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
            'publish_at' => 'datetime',
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
        return ! empty($this->attributes['image']) ? Storage::url($this->attributes['image']) : null;
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

    /**
     * Filter posts by tag ID.
     */
    public function filterTagId(Builder $query, int|string $value): void
    {
        $query->whereHas('tags', function (Builder $q) use ($value) {
            $q->where('tags.id', $value);
        });
    }

    /**
     * Scope a query to only include scheduled posts that are due for publishing.
     */
    public function scopeScheduledToPublish(Builder $query, ?Carbon $time = null): Builder
    {
        $time ??= now();

        return $query->where('status', PostStatus::Schedule)
            ->where('publish_at', '<=', $time);
    }

    /**
     * Scope a query to only include published posts.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', PostStatus::Published)
            ->whereNotNull('published_at');
    }
}
