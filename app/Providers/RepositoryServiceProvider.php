<?php

namespace App\Providers;

use App\Repositories\Cache\CachedRepository;
use App\Repositories\Cache\RepositoryCache;
use App\Repositories\Cache\RepositoryCacheInvalidator;
use App\Repositories\Cache\SoftDeleteCachedRepository;
use App\Repositories\Contracts\PostRepositoryInterface;
use App\Repositories\Contracts\SoftDeletesRepository;
use App\Repositories\Decorators\EventfulRepository;
use App\Repositories\Decorators\SoftDeleteEventfulRepository;
use App\Repositories\Eloquent\PostRepository;
use App\Repositories\Events\RepositoryChanged;
use App\Repositories\Listeners\InvalidateRepositoryCache;
use Illuminate\Support\ServiceProvider;

final class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(RepositoryCache::class, fn () => new RepositoryCache);
        $this->app->singleton(RepositoryCacheInvalidator::class);

        // REPO_BINDINGS:START
        $this->bindRepo(PostRepositoryInterface::class, PostRepository::class);
        // REPO_BINDINGS:END
    }

    public function boot(): void
    {
        $this->app['events']->listen(RepositoryChanged::class, InvalidateRepositoryCache::class);
    }

    /**
     * Bind contract -> concrete, wrap with:
     * - Cached{Model}Repository + Eventful{Model}Repository if exists (preferred)
     * - otherwise fallback to generic decorators (soft/non-soft aware)
     */
    public function bindRepo(string $contract, string $concrete): void
    {
        $this->app->bind($contract, function ($app) use ($contract, $concrete) {
            $baseRepo = $app->make($concrete);

            // Used for cache keys + RepositoryChanged event payload (NOT PHP namespace)
            $repoKey = class_basename($concrete); // e.g. PostRepository

            $cache = $app->make(RepositoryCache::class);

            // Prefer per-model wrappers (best DX: correct typing, easy customize)
            $wrapped = $this->wrapModelDecorators($baseRepo, $cache, $repoKey, $concrete);
            if ($wrapped !== null) {
                return $wrapped;
            }

            // Fallback: generic decorators
            $isSoftDeletes = is_subclass_of($contract, SoftDeletesRepository::class);

            if ($isSoftDeletes) {
                $cachedSoft = new SoftDeleteCachedRepository($baseRepo, $cache, $repoKey);
                $eventfulSoft = new SoftDeleteEventfulRepository($cachedSoft, $repoKey);

                return $eventfulSoft;
            }

            $cached = new CachedRepository($baseRepo, $cache, $repoKey);

            return new EventfulRepository($cached, $repoKey);
        });
    }

    /**
     * Convention:
     * - App\Repositories\Cache\Cached{Model}Repository
     * - App\Repositories\Decorators\Eventful{Model}Repository
     *
     * Where {Model} is derived from concrete name:
     *   PostRepository => Post
     */
    private function wrapModelDecorators(object $baseRepo, RepositoryCache $cache, string $repoKey, string $concrete): ?object
    {
        $short = class_basename($concrete); // PostRepository
        $model = preg_replace('/Repository$/', '', $short) ?: $short; // Post

        $cachedClass = "\\App\\Repositories\\Cache\\Cached{$model}Repository";
        $eventfulClass = "\\App\\Repositories\\Decorators\\Eventful{$model}Repository";

        if (! class_exists($cachedClass) || ! class_exists($eventfulClass)) {
            return null;
        }

        $cachedRepo = new $cachedClass($baseRepo, $cache, $repoKey);

        return new $eventfulClass($cachedRepo, $repoKey);
    }
}
