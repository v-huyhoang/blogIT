<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            // Permission & Role
            'view_permissions',
            'create_permissions',
            'edit_permissions',
            'delete_permissions',

            'view_roles',
            'create_roles',
            'edit_roles',
            'delete_roles',

            // User
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            'assign_roles',

            // Post
            'view_posts',
            'create_posts',
            'edit_posts',
            'delete_posts',

            'publish_posts',
            'unpublish_posts',
            'approve_posts',
            'reject_posts',

            'view_own_posts',
            'edit_own_posts',
            'delete_own_posts',

            // Category
            'view_categories',
            'create_categories',
            'edit_categories',
            'delete_categories',

            // Tag
            'view_tags',
            'create_tags',
            'edit_tags',
            'delete_tags',

            // Comment
            'view_comments',
            'delete_comments',
            'moderate_comments',

            // Interaction
            'like_posts',
            'bookmark_posts',

            // System
            'view_settings',
            'edit_settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Roles
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $author = Role::firstOrCreate(['name' => 'Author']);
        $subscriber = Role::firstOrCreate(['name' => 'Subscriber']);

        // Assign permissions
        $superAdmin->givePermissionTo(Permission::all());

        $admin->givePermissionTo([
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            'assign_roles',

            'view_posts',
            'create_posts',
            'edit_posts',
            'delete_posts',
            'publish_posts',
            'unpublish_posts',
            'approve_posts',
            'reject_posts',

            'view_categories',
            'create_categories',
            'edit_categories',
            'delete_categories',

            'view_tags',
            'create_tags',
            'edit_tags',
            'delete_tags',

            'view_comments',
            'delete_comments',
            'moderate_comments',
        ]);

        $author->givePermissionTo([
            'view_posts',
            'create_posts',
            'view_own_posts',
            'edit_own_posts',
            'delete_own_posts',
        ]);

        $subscriber->givePermissionTo([
            'view_posts',
            'like_posts',
            'bookmark_posts',
        ]);

        // Admin user
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $adminUser->assignRole($superAdmin);
    }
}
