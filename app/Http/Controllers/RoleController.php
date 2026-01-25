<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Services\RoleService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function __construct(private readonly RoleService $roleService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $roles = Role::select(['id', 'name', 'description', 'created_at'])
            ->with(['permissions' => function ($query) {
                $query->select(['permissions.id', 'permissions.name', 'permissions.description', 'permissions.created_at', 'permissions.updated_at']);
            }])
            ->latest()
            ->paginate(10)
            ->through(fn ($role) => [
                'id' => $role->id,
                'name' => $role->name,
                'description' => $role->description,
                'permissions' => $role->permissions->map(fn ($permission) => [
                    'id' => $permission->id,
                    'name' => $permission->name,
                ]),
            ]);

        return Inertia::render('roles/index', ['roles' => $roles]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('roles/create', [
            'permissions' => Permission::select(['id', 'name'])->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $this->roleService->createRole($request->validated());

        return to_route('roles.index')->with('message', 'Role created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role): Response
    {
        return Inertia::render('roles/edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'description' => $role->description,
                'permissions' => $role->permissions->map(fn ($permission) => [
                    'id' => $permission->id,
                    'name' => $permission->name,
                ]),
            ],
            'permissions' => Permission::select(['id', 'name'])->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        if ($role->name === 'Super Admin' && $request->name !== 'Super Admin') {
            return to_route('roles.index')->with('error', 'The Super Admin role name cannot be changed.');
        }

        $this->roleService->editRole($role, $request->validated());

        return to_route('roles.index')->with('message', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role): RedirectResponse
    {
        if ($role->name === 'Super Admin') {
            return to_route('roles.index')->with('error', 'The Super Admin role cannot be deleted.');
        }

        $this->roleService->deleteRole($role);

        return to_route('roles.index')->with('message', 'Role deleted successfully.');
    }
}
