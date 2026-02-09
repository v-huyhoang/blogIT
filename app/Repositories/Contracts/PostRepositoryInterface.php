<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface PostRepositoryInterface extends BaseRepositoryInterface, SoftDeletesRepository
{
    /**
     * Duplicate a post and its tags.
     */
    public function duplicate(Post $model): Post;

    /**
     * Publish a post.
     */
    public function publish(Post $model): Post;

    /**
     * Unpublish a post.
     */
    public function unpublish(Post $model): Post;

    /**
     * Get posts by IDs including trashed.
     */
    public function getByIdsIncludingTrashed(array $ids, array $columns = ['*']): Collection;

    /**
     * Get latest posts.
     */
    public function getLatestPosts(int $limit = 6): Collection;

    /**
     * Get featured posts.
     */
    public function getFeaturedPosts(int $limit = 4): Collection;

    /**
     * Get trending posts.
     */
    public function getTrendingPosts(int $limit = 6, int $days = 14): Collection;

    /**
     * Get personalized feed.
     */
    public function getPersonalizedFeed(?User $user = null, int $limit = 6): Collection;
}
