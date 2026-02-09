<?php

declare(strict_types=1);

namespace App\Repositories\Decorators;

use App\Models\Post;
use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Contracts\PostRepositoryInterface;
use App\Repositories\Events\RepositoryChanged;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Event;

/**
 * @property PostRepositoryInterface $inner
 */
final class EventfulPostRepository extends SoftDeleteEventfulRepository implements PostRepositoryInterface
{
    /**
     * @param  PostRepositoryInterface  $inner  The inner repository (enforced by type hint and check).
     */
    public function __construct(
        BaseRepositoryInterface $inner,
        string $namespace
    ) {
        if (! $inner instanceof PostRepositoryInterface) {
            throw new RepositoryException('Inner repository must implement PostRepositoryInterface');
        }

        parent::__construct($inner, $namespace);
    }

    public function duplicate(Post $model): Post
    {
        $result = $this->inner->duplicate($model);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $result;
    }

    public function publish(Post $model): Post
    {
        $result = $this->inner->publish($model);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $result;
    }

    public function unpublish(Post $model): Post
    {
        $result = $this->inner->unpublish($model);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $result;
    }

    public function getByIdsIncludingTrashed(array $ids, array $columns = ['*']): Collection
    {
        return $this->inner->getByIdsIncludingTrashed($ids, $columns);
    }

    public function getLatestPosts(int $limit = 6): Collection
    {
        return $this->inner->getLatestPosts($limit);
    }

    public function getFeaturedPosts(int $limit = 4): Collection
    {
        return $this->inner->getFeaturedPosts($limit);
    }

    public function getTrendingPosts(int $limit = 6, int $days = 14): Collection
    {
        return $this->inner->getTrendingPosts($limit, $days);
    }

    public function getPersonalizedFeed(?\App\Models\User $user = null, int $limit = 6): Collection
    {
        return $this->inner->getPersonalizedFeed($user, $limit);
    }
}
