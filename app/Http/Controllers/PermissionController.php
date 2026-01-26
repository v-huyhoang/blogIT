<?php

namespace App\Http\Controllers;

use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;
use App\Models\Permission;
use App\Services\PermissionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    public function __construct(private readonly PermissionService $permissionService) {}

    public function index(): Response
    {
        $permissions = Permission::select(['id', 'name', 'description', 'created_at', 'updated_at'])
            ->latest()
            ->paginate(15)
            ->through(fn ($permission) => [
                'id' => $permission->id,
                'name' => $permission->name,
                'description' => $permission->description,
                'created_at' => $permission->created_at?->format('Y-m-d H:i:s'),
                'updated_at' => $permission->updated_at?->format('Y-m-d H:i:s'),
            ]);

        return Inertia::render('permissions/index', [
            'permissions' => $permissions,
        ]);
    }

    public function store(StorePermissionRequest $request): RedirectResponse
    {
        $this->permissionService->createPermission($request->validated());

        return to_route('permissions.index')->with('message', 'Permission created successfully.');
    }

    public function update(UpdatePermissionRequest $request, Permission $permission): RedirectResponse
    {
        $this->permissionService->editPermission($permission, $request->validated());

        return to_route('permissions.index')->with('message', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $this->permissionService->deletePermission($permission);

        return to_route('permissions.index')->with('message', 'Permission deleted successfully.');
    }
}
