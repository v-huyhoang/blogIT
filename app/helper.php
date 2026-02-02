<?php

use App\Models\Permission;
use Illuminate\Support\Facades\Cache;

if (! function_exists('cachedAccessControl')) {
    function cachedAccessControl($user): array
    {
        if (! $user) {
            return [];
        }

        if ($user->isSuperAdmin()) {
            return Cache::rememberForever('cached_access_control', function () {
                return Permission::query()->pluck('name')->toArray();
            });
        }

        // Cache for 24 hours for better performance
        return Cache::remember("user_permissions_{$user->id}", now()->addHours(24), function () use ($user) {
            return $user->getAllPermissions()->pluck('name')->toArray();
        });
    }
}
