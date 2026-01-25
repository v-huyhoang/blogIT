<?php

namespace App\Repositories\Decorators;

use App\Repositories\Contracts\SoftDeletesRepository;
use App\Repositories\Events\RepositoryChanged;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Event;

/**
 * Class SoftDeleteEventfulRepository
 *
 * @template TModel of Model
 *
 * @extends EventfulRepository<TModel>
 *
 * @implements SoftDeletesRepository
 */
class SoftDeleteEventfulRepository extends EventfulRepository implements SoftDeletesRepository
{
    /**
     * {@inheritDoc}
     */
    public function restore(int|string $id): bool
    {
        if (! $this->inner instanceof SoftDeletesRepository) {
            throw new RepositoryException('Inner repository does not support soft deletes.');
        }

        $result = $this->inner->restore($id);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $result;
    }

    /**
     * {@inheritDoc}
     */
    public function restoreMany(array $ids): int
    {
        if (! $this->inner instanceof SoftDeletesRepository) {
            throw new RepositoryException('Inner repository does not support soft deletes.');
        }

        $affected = $this->inner->restoreMany($ids);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $affected;
    }

    /**
     * {@inheritDoc}
     */
    public function forceDelete(int|string $id): bool
    {
        if (! $this->inner instanceof SoftDeletesRepository) {
            throw new RepositoryException('Inner repository does not support soft deletes.');
        }

        $result = $this->inner->forceDelete($id);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $result;
    }

    /**
     * {@inheritDoc}
     */
    public function forceDeleteMany(array $ids): int
    {
        if (! $this->inner instanceof SoftDeletesRepository) {
            throw new RepositoryException('Inner repository does not support soft deletes.');
        }

        $affected = $this->inner->forceDeleteMany($ids);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $affected;
    }
}
