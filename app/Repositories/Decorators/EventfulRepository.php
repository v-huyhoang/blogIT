<?php

namespace App\Repositories\Decorators;

use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Events\RepositoryChanged;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Event;

/**
 * Class EventfulRepository
 *
 * @template TModel of Model
 *
 * @implements BaseRepositoryInterface<TModel>
 */
class EventfulRepository implements BaseRepositoryInterface
{
    /**
     * @param  BaseRepositoryInterface<TModel>  $inner
     */
    public function __construct(
        protected readonly BaseRepositoryInterface $inner,
        protected readonly string $namespace
    ) {}

    /**
     * {@inheritDoc}
     */
    public function findForUpdate(int|string $id): Model
    {
        return $this->inner->findForUpdate($id);
    }

    /**
     * {@inheritDoc}
     */
    public function findWithSharedLock(int|string $id): Model
    {
        return $this->inner->findWithSharedLock($id);
    }

    /**
     * {@inheritDoc}
     */
    public function find(int|string $id, array $columns = ['*'], array $relations = []): ?Model
    {
        return $this->inner->find($id, $columns, $relations);
    }

    /**
     * {@inheritDoc}
     */
    public function findOrFail(int|string $id, array $columns = ['*'], array $relations = []): Model
    {
        return $this->inner->findOrFail($id, $columns, $relations);
    }

    /**
     * {@inheritDoc}
     */
    public function findBy(string $attribute, mixed $value, array $columns = ['*'], array $relations = []): ?Model
    {
        return $this->inner->findBy($attribute, $value, $columns, $relations);
    }

    /**
     * {@inheritDoc}
     */
    public function getByIds(array $ids, array $columns = ['*'], array $relations = []): Collection
    {
        return $this->inner->getByIds($ids, $columns, $relations);
    }

    /**
     * {@inheritDoc}
     */
    public function paginate(int $perPage = 15, array $columns = ['*'], array $filters = [], array $relations = []): LengthAwarePaginator
    {
        return $this->inner->paginate($perPage, $columns, $filters, $relations);
    }

    /**
     * {@inheritDoc}
     */
    public function create(array $attributes): Model
    {
        $model = $this->inner->create($attributes);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $model;
    }

    /**
     * {@inheritDoc}
     */
    public function update(int|string $id, array $attributes): Model
    {
        $model = $this->inner->update($id, $attributes);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $model;
    }

    /**
     * {@inheritDoc}
     */
    public function delete(int|string $id): bool
    {
        $ok = $this->inner->delete($id);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $ok;
    }

    /**
     * {@inheritDoc}
     */
    public function deleteMany(array $ids): int
    {
        $affected = $this->inner->deleteMany($ids);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $affected;
    }
}
