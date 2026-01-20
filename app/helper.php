<?php

use Spatie\Permission\Models\Permission;

if (! function_exists('cachedAccessControl')) {
    function cachedAccessControl($user): array
    {
        if ($user->hasRole('Super Admin')) {
            return Cache::rememberForever('cached_access_control', function () {
                return Permission::query()->pluck('name')->toArray();
            });
        }

        return $user->getAllPermissions()->pluck('name')->toArray();
    }
}
