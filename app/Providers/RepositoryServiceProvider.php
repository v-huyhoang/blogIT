<?php

namespace App\Providers;

use App\Repositories\Cache\CachedRepository;
use App\Repositories\Cache\RepositoryCache;
use App\Repositories\Cache\RepositoryCacheInvalidator;
use App\Repositories\Cache\SoftDeleteCachedRepository;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\PostRepositoryInterface;
use App\Repositories\Contracts\SoftDeletesRepository;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Decorators\EventfulRepository;
use App\Repositories\Decorators\SoftDeleteEventfulRepository;
use App\Repositories\Eloquent\CategoryRepository;
use App\Repositories\Eloquent\PostRepository;
use App\Repositories\Eloquent\TagRepository;
use App\Repositories\Eloquent\UserRepository;
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
        $this->bindRepo(TagRepositoryInterface::class, TagRepository::class);
        $this->bindRepo(PostRepositoryInterface::class, PostRepository::class);
        $this->bindRepo(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->bindRepo(UserRepositoryInterface::class, UserRepository::class);
        // REPO_BINDINGS:END
    }

    public function boot(): void
    {
        $this->app['events']->listen(RepositoryChanged::class, InvalidateRepositoryCache::class);
    }

    /**
     * Register a binding from a contract to a concrete class.
     *
     * Automatically wraps the concrete class in Eventful and Cached decorators.
     *
     * If the contract implements SoftDeletesRepository, it will also be wrapped in
     * SoftDeleteCachedRepository and SoftDeleteEventfulRepository.
     *
     * @param  string  $contract  The interface name of the repository.
     * @param  string  $concrete  The class name of the repository implementation.
     */
    public function bindRepo(string $contract, string $concrete): void
    {
        $this->app->bind($contract, function ($app) use ($contract, $concrete) {
            $baseRepo = $app->make($concrete);

            $repoKey = class_basename($concrete); // e.g. PostRepository

            $cache = $app->make(RepositoryCache::class);

            $wrapped = $this->wrapModelDecorators($baseRepo, $cache, $repoKey, $concrete);
            if ($wrapped !== null) {
                return $wrapped;
            }

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
     * Wraps the given repository with caching and eventful decorators based on the given model name.
     *
     * @param  object  $baseRepo  The base repository to wrap.
     * @param  RepositoryCache  $cache  The cache instance to use.
     * @param  string  $repoKey  The key to use in the cache.
     * @param  string  $concrete  The concrete repository class name.
     * @return object|null The wrapped repository or null if the decorators do not exist.
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
