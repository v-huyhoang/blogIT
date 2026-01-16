<?php

namespace App\Repositories\Decorators;

use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Events\RepositoryChanged;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Event;

class EventfulRepository implements BaseRepositoryInterface
{
    public function __construct(
        protected readonly BaseRepositoryInterface $inner,
        protected readonly string $namespace
    ) {}

    /** @return class-string<Model> */
    public function model(): string
    {
        return $this->inner->model();
    }

    public function query(): Builder
    {
        return $this->inner->query();
    }

    public function find(int|string $id, array $columns = ['*'], array $relations = []): ?Model
    {
        return $this->inner->find($id, $columns, $relations);
    }

    public function findOrFail(int|string $id, array $columns = ['*'], array $relations = []): Model
    {
        return $this->inner->findOrFail($id, $columns, $relations);
    }

    public function getByIds(array $ids, array $columns = ['*'], array $relations = []): Collection
    {
        return $this->inner->getByIds($ids, $columns, $relations);
    }

    public function paginate(int $perPage = 15, array $columns = ['*'], array $filters = [], array $relations = [], array $orderBy = []): LengthAwarePaginator
    {
        return $this->inner->paginate($perPage, $columns, $filters, $relations, $orderBy);
    }

    public function create(array $attributes): Model
    {
        $model = $this->inner->create($attributes);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $model;
    }

    public function update(int|string $id, array $attributes): Model
    {
        $model = $this->inner->update($id, $attributes);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $model;
    }

    public function delete(int|string $id): bool
    {
        $ok = $this->inner->delete($id);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $ok;
    }

    public function deleteMany(array $ids): int
    {
        $affected = $this->inner->deleteMany($ids);
        Event::dispatch(new RepositoryChanged($this->namespace));

        return $affected;
    }
}
