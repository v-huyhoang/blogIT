<?php

namespace App\Providers;

use App\Events\PostPublished;
use App\Listeners\PostPublishedHandler;
use Illuminate\Database\Connection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Queue\Events\JobFailed;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Event listeners
        Event::listen(PostPublished::class, PostPublishedHandler::class);

        // Eloquent strict mode
        if (! app()->isProduction()) {
            Model::shouldBeStrict();
            // Slow query logging
            DB::whenQueryingForLongerThan(500, function (Connection $connection, QueryExecuted $event) {
                logger()->warning('Slow query detected', [
                    'connection' => $connection->getName(),
                    'sql' => $event->sql,
                    'bindings' => $event->bindings,
                    'time' => "{$event->time}ms",
                    'url' => request()->fullUrl(),
                ]);
            });
        }

        // Failed queue job logging
        Queue::failing(function (JobFailed $event) {
            logger()->error('Queue job failed', [
                'connection' => $event->connectionName,
                'job' => $event->job->resolveName(),
                'exception' => $event->exception->getMessage(),
            ]);
        });

        Gate::before(function ($user, $ability) {
            return $user->isSuperAdmin() ? true : null;
        });
    }
}
