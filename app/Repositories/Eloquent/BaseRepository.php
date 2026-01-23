<?php

namespace App\Repositories\Eloquent;

use App\Filters\FilterPipeline;
use App\Filters\Pipes\ColumnFilter;
use App\Filters\Pipes\ComparisonFilter;
use App\Filters\Pipes\SearchFilter;
use App\Filters\Pipes\SortFilter;
use App\Filters\Pipes\TrashedFilter;
use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Throwable;

/**
 * Class BaseRepository
 *
 * @template TModel of Model
 *
 * @implements BaseRepositoryInterface<TModel>
 */
abstract class BaseRepository implements BaseRepositoryInterface
{
    /**
     * @var TModel
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     *
     * @throws RepositoryException
     */
    public function __construct()
    {
        $class = $this->model();
        if (! is_subclass_of($class, Model::class)) {
            throw new RepositoryException("Invalid model for repository: {$class}");
        }
        $this->model = new $class;
    }

    /**
     * {@inheritDoc}
     */
    abstract public function model(): string;

    public function findForUpdate(int|string $id): Model
    {
        return $this->query()->lockForUpdate()->findOrFail($id);
    }

    public function findWithSharedLock(int|string $id): Model
    {
        return $this->query()->sharedLock()->findOrFail($id);
    }

    /**
     * {@inheritDoc}
     */
    protected function query(): Builder
    {
        return $this->model->newQuery();
    }

    /**
     * {@inheritDoc}
     */
    public function find(int|string $id, array $columns = ['*'], array $relations = []): ?Model
    {
        return $this->query()->with($relations)->select($columns)->find($id);
    }

    /**
     * {@inheritDoc}
     */
    public function findOrFail(int|string $id, array $columns = ['*'], array $relations = []): Model
    {
        return $this->query()->with($relations)->select($columns)->findOrFail($id);
    }

    /**
     * {@inheritDoc}
     */
    public function findBy(string $attribute, mixed $value, array $columns = ['*'], array $relations = []): ?Model
    {
        return $this->query()->with($relations)->select($columns)->where($attribute, $value)->first();
    }

    /**
     * {@inheritDoc}
     */
    public function getByIds(array $ids, array $columns = ['*'], array $relations = []): Collection
    {
        $ids = array_values(array_unique(array_filter($ids, fn ($v) => $v !== null && $v !== '')));
        if ($ids === []) {
            return $this->model->newCollection();
        }

        return $this->query()->with($relations)->select($columns)->whereKey($ids)->get();
    }

    /**
     * {@inheritDoc}
     */
    public function paginate(int $perPage = 15, array $columns = ['*'], array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $query = $this->query()->with($relations)->select($columns);

        $this->applyFilters($query, $filters);

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * {@inheritDoc}
     */
    public function create(array $attributes): Model
    {
        try {
            return $this->query()->create($attributes);
        } catch (Throwable $e) {
            throw new RepositoryException("Create failed: {$this->model()}", 0, $e);
        }
    }

    /**
     * {@inheritDoc}
     */
    public function update(int|string $id, array $attributes): Model
    {
        try {
            $model = $this->findOrFail($id);
            $model->fill($attributes);
            $model->save();

            return $model;
        } catch (Throwable $e) {
            throw new RepositoryException("Update failed: {$this->model()}", 0, $e);
        }
    }

    /**
     * {@inheritDoc}
     */
    public function delete(int|string $id): bool
    {
        try {
            $model = $this->findOrFail($id);

            return (bool) $model->delete();
        } catch (Throwable $e) {
            throw new RepositoryException("Delete failed: {$this->model()}", 0, $e);
        }
    }

    /**
     * {@inheritDoc}
     */
    public function deleteMany(array $ids): int
    {
        if ($ids === []) {
            return 0;
        }

        try {
            return (int) $this->query()->whereKey($ids)->delete();
        } catch (Throwable $e) {
            throw new RepositoryException("DeleteMany failed: {$this->model()}", 0, $e);
        }
    }

    /**
     * Applies the filter pipeline to the given query.
     *
     * @param  Builder  $query  The query to apply filters to.
     * @param  array  $filters  The filters to apply to the query.
     */
    protected function applyFilters(Builder $query, array $filters): void
    {
        $pipeline = new FilterPipeline([
            TrashedFilter::class,
            SearchFilter::class,
            ComparisonFilter::class,
            ColumnFilter::class,
            SortFilter::class,
        ]);

        $pipeline->apply($query, $filters);
    }
}
