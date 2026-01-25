<?php

declare(strict_types=1);

namespace App\Repositories\Cache;

use App\Models\Post;
use App\Repositories\Contracts\PostRepositoryInterface;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Collection;

final class CachedPostRepository extends SoftDeleteCachedRepository implements PostRepositoryInterface
{
    public function duplicate(Post $model): Post
    {
        if (! $this->inner instanceof PostRepositoryInterface) {
            throw new RepositoryException('Inner repository does not implement PostRepositoryInterface.');
        }

        return $this->inner->duplicate($model);
    }

    public function publish(Post $model): Post
    {
        if (! $this->inner instanceof PostRepositoryInterface) {
            throw new RepositoryException('Inner repository does not implement PostRepositoryInterface.');
        }

        return $this->inner->publish($model);
    }

    public function unpublish(Post $model): Post
    {
        if (! $this->inner instanceof PostRepositoryInterface) {
            throw new RepositoryException('Inner repository does not implement PostRepositoryInterface.');
        }

        return $this->inner->unpublish($model);
    }

    public function getByIdsIncludingTrashed(array $ids, array $columns = ['*']): Collection
    {
        if (! $this->inner instanceof PostRepositoryInterface) {
            throw new RepositoryException('Inner repository does not implement PostRepositoryInterface.');
        }

        return $this->inner->getByIdsIncludingTrashed($ids, $columns);
    }
}
