<?php

namespace App\Repositories\Cache;

use App\Repositories\Contracts\BaseRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class CachedRepository implements BaseRepositoryInterface
{
    public function __construct(
        protected readonly BaseRepositoryInterface $inner,
        protected readonly RepositoryCache $cache,
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
        /** @var ?Model */
        return $this->remember(
            'find',
            [$id, $columns, $relations],
            fn (): ?Model => $this->inner->find($id, $columns, $relations)
        );
    }

    public function findOrFail(int|string $id, array $columns = ['*'], array $relations = []): Model
    {
        return $this->inner->findOrFail($id, $columns, $relations);
    }

    public function getByIds(array $ids, array $columns = ['*'], array $relations = []): Collection
    {
        /** @var Collection */
        return $this->remember(
            'getByIds',
            [$ids, $columns, $relations],
            fn (): Collection => $this->inner->getByIds($ids, $columns, $relations)
        );
    }

    public function paginate(int $perPage = 15, array $columns = ['*'], array $filters = [], array $relations = [], array $orderBy = []): LengthAwarePaginator
    {
        $page = (int) request()->integer('page', 1);

        /** @var LengthAwarePaginator */
        return $this->remember(
            'paginate',
            [$perPage, $columns, $filters, $relations, $orderBy, $page],
            fn (): LengthAwarePaginator => $this->inner->paginate($perPage, $columns, $filters, $relations, $orderBy)
        );
    }

    // Writes: không cache, đi thẳng
    public function create(array $attributes): Model
    {
        return $this->inner->create($attributes);
    }

    public function update(int|string $id, array $attributes): Model
    {
        return $this->inner->update($id, $attributes);
    }

    public function delete(int|string $id): bool
    {
        return $this->inner->delete($id);
    }

    public function deleteMany(array $ids): int
    {
        return $this->inner->deleteMany($ids);
    }

    /**
     * @template T
     *
     * @param  \Closure():T  $callback
     * @return T
     */
    private function remember(string $method, array $parts, \Closure $callback): mixed
    {
        if (! $this->cache->enabled()) {
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
