<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Interface BaseRepositoryInterface
 *
 * @template TModel of Model
 */
interface BaseRepositoryInterface
{
    /**
     * Find a model by its primary key.
     *
     * @param  array<int, string>  $columns
     * @param  array<int, string>  $relations
     * @return TModel|null
     */
    public function find(int|string $id, array $columns = ['*'], array $relations = []): ?Model;

    /**
     * Find a model by its primary key or throw an exception.
     *
     * @param  array<int, string>  $columns
     * @param  array<int, string>  $relations
     * @return TModel
     *
     * @throws ModelNotFoundException
     */
    public function findOrFail(int|string $id, array $columns = ['*'], array $relations = []): Model;

    /**
     * Find a model by a specific attribute.
     *
     * @param  array<int, string>  $columns
     * @param  array<int, string>  $relations
     * @return TModel|null
     */
    public function findBy(string $attribute, mixed $value, array $columns = ['*'], array $relations = []): ?Model;

    /**
     * Get multiple models by their primary keys.
     *
     * @param  array<int, int|string>  $ids
     * @param  array<int, string>  $columns
     * @param  array<int, string>  $relations
     * @return Collection<int, TModel>
     */
    public function getByIds(array $ids, array $columns = ['*'], array $relations = []): Collection;

    /**
     * Paginate the models.
     *
	 * @param  int  $perPage
     * @param  array<int, string>  $columns
     * @param  array<string, mixed>  $filters
     * @param  array<int, string>  $relations
     * @return LengthAwarePaginator<TModel>
     */
    public function paginate(int $perPage = 15, array $columns = ['*'], array $filters = [], array $relations = []): LengthAwarePaginator;

    /**
     * Create a new model instance.
     *
     * @param  array<string, mixed>  $attributes
     * @return TModel
     */
    public function create(array $attributes): Model;

    /**
     * Update an existing model.
     *
     * @param  array<string, mixed>  $attributes
     * @return TModel
     *
     * @throws ModelNotFoundException
     */
    public function update(int|string $id, array $attributes): Model;

    /**
     * Delete a model by its primary key.
     *
     *
     * @throws ModelNotFoundException
     */
    public function delete(int|string $id): bool;

    /**
     * Delete multiple models by their primary keys.
     *
     * @param  array<int, int|string>  $ids
     * @return int Number of affected rows
     */
    public function deleteMany(array $ids): int;

    /**
     * Find a record and lock it FOR UPDATE.
     *
     * @return TModel
     */
    public function findForUpdate(int|string $id): Model;

    /**
     * Find a record with SHARED LOCK.
     *
     * @return TModel
     */
    public function findWithSharedLock(int|string $id): Model;
}
