<?php

namespace App\Services;

use App\Models\Role;
use App\Services\Traits\TransactionTrait;
use Throwable;

class RoleService
{
    use TransactionTrait;

    /**
     * Create a new role
     *
     * @param  array  $data  The data to create the role with
     * @return Role The created role
     *
     * @throws Throwable
     */
    public function createRole(array $data): Role
    {
        return $this->transaction(function () use ($data) {
            $role = Role::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'guard_name' => $data['guard_name'] ?? config('auth.defaults.guard'),
            ]);

            $role->syncPermissions($data['permissions']);

            return $role;
        });
    }

    /**
     * Edit a role
     *
     * @param  Role  $role  The role to edit
     * @param  array  $data  The data to update the role with
     * @return Role The updated role
     */
    public function editRole(Role $role, array $data): Role
    {
        return $this->transaction(function () use ($role, $data) {
            $role->update([
                'name' => $data['name'],
                'description' => $data['description'],
                'guard_name' => $data['guard_name'] ?? $role->guard_name,
            ]);

            $role->syncPermissions($data['permissions']);

            return $role;
        });
    }

    /**
     * Delete a role
     *
     * @param  Role  $role  The role to delete
     * @return bool Whether the role was successfully deleted
     */
    public function deleteRole(Role $role): bool
    {
        return (bool) $role->delete();
    }
}
