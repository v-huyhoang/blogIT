<?php

namespace App\Providers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use Spatie\Permission\Models\Permission;

class RBACServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $cacheKey = 'cached_access_control';

        $clearPermissionCache = function () use ($cacheKey) {
            Cache::forget($cacheKey);
        };

        Permission::saved($clearPermissionCache);

        Permission::deleted($clearPermissionCache);
    }
}
