<?php

namespace App\Repositories\Cache;

/**
 * Class RepositoryCacheInvalidator
 *
 * Service responsible for clearing or version-bumping repository caches.
 */
final class RepositoryCacheInvalidator
{
    /**
     * @param  RepositoryCache  $cache  The cache configuration manager.
     */
    public function __construct(private readonly RepositoryCache $cache) {}

    /**
     * Invalidate the cache for a given repository namespace.
     *
     * This uses Tags if supported (Redis), or Version Bumping if not (File/Database).
     *
     * @param  string  $namespace  The namespace to invalidate (usually the Repository class name).
     */
    public function invalidate(string $namespace): void
    {
        if (! $this->cache->enabled()) {
            return;
        }

        $store = $this->cache->store();
        $keys = new CacheKeys($this->cache->prefix(), $namespace);

        if ($this->cache->useTags() && $this->cache->supportsTags()) {
            $store->tags([$keys->tag()])->flush();

            return;
        }

        // Fallback for database/file store: bump version => invalidate O(1)
        $store->forever($keys->versionKey(), (int) $store->get($keys->versionKey(), 1) + 1);
    }
}
