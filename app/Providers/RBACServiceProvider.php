<?php

namespace App\Providers;

use App\Models\Permission;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use Spatie\Permission\PermissionRegistrar;

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
        $clearPermissionCache = function () {
            Cache::forget('cached_access_control');

            // use Spatie's internal forgetCachedPermissions if needed.
            app(PermissionRegistrar::class)->forgetCachedPermissions();
        };

        Permission::saved($clearPermissionCache);
        Permission::deleted($clearPermissionCache);
    }
}
