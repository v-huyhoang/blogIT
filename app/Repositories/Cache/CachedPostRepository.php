<?php

declare(strict_types=1);

namespace App\Repositories\Cache;

use App\Models\Post;
use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Contracts\PostRepositoryInterface;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Collection;

/**
 * @property PostRepositoryInterface $inner
 */
final class CachedPostRepository extends SoftDeleteCachedRepository implements PostRepositoryInterface
{
    /**
     * @param  PostRepositoryInterface  $inner  The inner repository (enforced by type hint and check).
     */
    public function __construct(
        BaseRepositoryInterface $inner,
        RepositoryCache $cache,
        string $namespace
    ) {
        if (! $inner instanceof PostRepositoryInterface) {
            throw new RepositoryException('Inner repository must implement PostRepositoryInterface');
        }

        parent::__construct($inner, $cache, $namespace);
    }

    public function duplicate(Post $model): Post
    {
        return $this->inner->duplicate($model);
    }

    public function publish(Post $model): Post
    {
        return $this->inner->publish($model);
    }

    public function unpublish(Post $model): Post
    {
        return $this->inner->unpublish($model);
    }

    public function getByIdsIncludingTrashed(array $ids, array $columns = ['*']): Collection
    {
        return $this->inner->getByIdsIncludingTrashed($ids, $columns);
    }

    public function getLatestPosts(int $limit = 6): Collection
    {
        return $this->remember(
            'getLatestPosts',
            [$limit],
            fn () => $this->inner->getLatestPosts($limit)
        );
    }

    public function getFeaturedPosts(int $limit = 4): Collection
    {
        return $this->remember(
            'getFeaturedPosts',
            [$limit],
            fn () => $this->inner->getFeaturedPosts($limit)
        );
    }

    public function getTrendingPosts(int $limit = 6, int $days = 14): Collection
    {
        return $this->remember(
            'getTrendingPosts',
            [$limit, $days],
            fn () => $this->inner->getTrendingPosts($limit, $days)
        );
    }

    public function getPersonalizedFeed(?\App\Models\User $user = null, int $limit = 6): Collection
    {
        $userId = $user?->id;

        return $this->remember(
            'getPersonalizedFeed',
            [$userId, $limit],
            fn () => $this->inner->getPersonalizedFeed($user, $limit)
        );
    }
}
