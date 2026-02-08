<?php

namespace App\Repositories\Cache;

use App\Repositories\Contracts\BaseRepositoryInterface;
use Closure;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CachedRepository
 *
 * @template TModel of Model
 *
 * @implements BaseRepositoryInterface<TModel>
 */
class CachedRepository implements BaseRepositoryInterface
{
    protected bool $skipCache = false;

    /**
     * @param  BaseRepositoryInterface<TModel>  $inner
     */
    public function __construct(
        protected readonly BaseRepositoryInterface $inner,
        protected readonly RepositoryCache $cache,
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
        return $this->remember(
            'find',
            [$id, $columns, $relations],
            fn (): ?Model => $this->inner->find($id, $columns, $relations)
        );
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
        return $this->remember(
            'findBy',
            [$attribute, $value, $columns, $relations],
            fn (): ?Model => $this->inner->findBy($attribute, $value, $columns, $relations)
        );
    }

    /**
     * {@inheritDoc}
     */
    public function getByIds(array $ids, array $columns = ['*'], array $relations = []): Collection
    {
        return $this->remember(
            'getByIds',
            [$ids, $columns, $relations],
            fn (): Collection => $this->inner->getByIds($ids, $columns, $relations)
        );
    }

    /**
     * {@inheritDoc}
     */
    public function paginate(int $perPage = 15, array $columns = ['*'], array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $page = (int) request()->integer('page', 1);

        return $this->remember(
            'paginate',
            [$perPage, $columns, $filters, $relations, $page],
            fn (): LengthAwarePaginator => $this->inner->paginate($perPage, $columns, $filters, $relations)
        );
    }

    /**
     * {@inheritDoc}
     */
    public function create(array $attributes): Model
    {
        return $this->inner->create($attributes);
    }

    /**
     * {@inheritDoc}
     */
    public function update(int|string $id, array $attributes): Model
    {
        return $this->inner->update($id, $attributes);
    }

    /**
     * {@inheritDoc}
     */
    public function delete(int|string $id): bool
    {
        return $this->inner->delete($id);
    }

    /**
     * {@inheritDoc}
     */
    public function deleteMany(array $ids): int
    {
        return $this->inner->deleteMany($ids);
    }

    /**
     * Execute a callback and cache the result or return from cache.
     *
     * @template T
     *
     * @param  array<mixed>  $parts
     * @param  Closure(): T  $callback
     * @return T
     */
    protected function remember(string $method, array $parts, Closure $callback): mixed
    {
        if ($this->skipCache || ! $this->cache->enabled()) {
            $this->skipCache = false;

            return $callback();
        }

        $store = $this->cache->store();
        $keys = new CacheKeys($this->cache->prefix(), $this->namespace);

        $v = (int) $store->get($keys->versionKey(), 1);
        $key = $keys->make($method, $parts).':v'.$v;

        if ($this->cache->useTags() && $this->cache->supportsTags()) {
            return $store->tags([$keys->tag()])->remember($key, $this->cache->ttl(), $callback);
        }

        return $store->remember($key, $this->cache->ttl(), $callback);
    }
}
