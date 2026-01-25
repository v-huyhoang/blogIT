<?php

namespace App\Repositories\Cache;

/**
 * Class CacheKeys
 *
 * Utility class to manage deterministic cache keys and tags.
 */
final class CacheKeys
{
    /**
     * @param  string  $prefix  Global cache prefix.
     * @param  string  $namespace  The repository-specific namespace (usually class name).
     */
    public function __construct(
        private readonly string $prefix,
        private readonly string $namespace
    ) {}

    /**
     * Get the key used for cache versioning.
     *
     * Used for O(1) invalidation on stores that don't support tags.
     */
    public function versionKey(): string
    {
        return "{$this->prefix}:{$this->namespace}:v";
    }

    /**
     * Generate a deterministic cache key for a method and its parameters.
     *
     * @param  string  $method  The calling method name.
     * @param  array<mixed>  $parts  Arguments passed to the method to ensure unique keys per input.
     */
    public function make(string $method, array $parts = []): string
    {
        /** @var array<int, string> $normalized */
        $normalized = array_map(
            fn ($v) => is_scalar($v) ? (string) $v : md5(serialize($v)),
            $parts
        );

        return implode(':', array_filter([$this->prefix, $this->namespace, $method, ...$normalized]));
    }

    /**
     * Get the tag name for this repository's cache entries.
     */
    public function tag(): string
    {
        return "{$this->prefix}:{$this->namespace}";
    }
}
