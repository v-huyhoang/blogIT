<?php

namespace App\Repositories\Cache;

use Illuminate\Contracts\Cache\Repository as CacheRepository;
use Illuminate\Support\Facades\Cache;

/**
 * Class RepositoryCache
 *
 * Central configuration manager for the repository caching layer.
 */
final class RepositoryCache
{
    /**
     * Check if caching is enabled globally for repositories.
     */
    public function enabled(): bool
    {
        return (bool) config('repository.cache.enabled', true);
    }

    /**
     * Get the time to live (in seconds) for cached repository results.
     */
    public function ttl(): int
    {
        return (int) config('repository.cache.ttl', 300);
    }

    /**
     * Return the prefix used for all cache keys.
     */
    public function prefix(): string
    {
        return (string) config('repository.cache.prefix', 'repo');
    }

    /**
     * Check if caching with tags is enabled.
     */
    public function useTags(): bool
    {
        return (bool) config('repository.cache.use_tags', true);
    }

    /**
     * Return the cache store instance to use for caching.
     */
    public function store(): CacheRepository
    {
        return Cache::store(config('cache.default'));
    }

    /**
     * Check if the currently configured cache store supports cache tags.
     */
    public function supportsTags(): bool
    {
        return method_exists($this->store()->getStore(), 'tags');
    }
}
