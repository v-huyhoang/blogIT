<?php

namespace App\Services;

use App\Models\Permission;
use App\Services\Traits\TransactionTrait;

class PermissionService
{
    use TransactionTrait;

    /**
     * Creates a new permission in the database.
     *
     * @param  array  $data  The data to be inserted.
     * @return Permission The newly created permission.
     */
    public function createPermission(array $data): Permission
    {
        return Permission::create($data);
    }

    /**
     * Edits a permission in the database.
     *
     * @param  Permission  $permission  The permission to be edited.
     * @param  array  $data  The data to be updated.
     * @return Permission The edited permission.
     */
    public function editPermission(Permission $permission, array $data): Permission
    {
        $permission->update($data);

        return $permission;
    }

    /**
     * Deletes a permission from the database.
     *
     * @param  Permission  $permission  The permission to be deleted.
     * @return bool True if the permission was successfully deleted, false otherwise.
     */
    public function deletePermission(Permission $permission): bool
    {
        return (bool) $permission->delete();
    }
}
