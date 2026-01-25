<?php

namespace App\Repositories\Cache;

use App\Repositories\Contracts\SoftDeletesRepository;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SoftDeleteCachedRepository
 *
 * @template TModel of Model
 *
 * @extends CachedRepository<TModel>
 *
 * @implements SoftDeletesRepository
 */
class SoftDeleteCachedRepository extends CachedRepository implements SoftDeletesRepository
{
    /**
     * {@inheritDoc}
     */
    public function restore(int|string $id): bool
    {
        if (! $this->inner instanceof SoftDeletesRepository) {
            throw new RepositoryException('Inner repository does not support soft deletes.');
        }

        return $this->inner->restore($id);
    }

    /**
     * {@inheritDoc}
     */
    public function restoreMany(array $ids): int
    {
        if (! $this->inner instanceof SoftDeletesRepository) {
            throw new RepositoryException('Inner repository does not support soft deletes.');
        }

        return $this->inner->restoreMany($ids);
    }

    /**
     * {@inheritDoc}
     */
    public function forceDelete(int|string $id): bool
    {
        if (! $this->inner instanceof SoftDeletesRepository) {
            throw new RepositoryException('Inner repository does not support soft deletes.');
        }

        return $this->inner->forceDelete($id);
    }

    /**
     * {@inheritDoc}
     */
    public function forceDeleteMany(array $ids): int
    {
        if (! $this->inner instanceof SoftDeletesRepository) {
            throw new RepositoryException('Inner repository does not support soft deletes.');
        }

        return $this->inner->forceDeleteMany($ids);
    }
}
