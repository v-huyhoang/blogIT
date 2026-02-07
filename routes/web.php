<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Frontend Routes
Route::prefix('f')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('frontend/auth/login');
    })->name('user.login');
    Route::get('/register', function () {
        return Inertia::render('frontend/auth/register');
    })->name('user.register');
    Route::get('/blog', function () {
        return Inertia::render('frontend/blogs/index');
    })->name('blog.index');

    Route::get('/blog/{slug}', function () {
        return Inertia::render('frontend/blogs/show');
    })->name('blog.show');

    Route::get('/tags', function () {
        return Inertia::render('frontend/tags/index');
    })->name('tags.index');

    Route::get('/categories', function () {
        return Inertia::render('frontend/categories/index');
    })->name('categories.index');

    Route::get('/snippets', function () {
        return Inertia::render('frontend/snippets/index');
    })->name('snippets.index');

    Route::get('/author/{slug}', function () {
        return Inertia::render('frontend/authors/show');
    })->name('author.show');

    Route::prefix('user')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('frontend/users/dashboard');
        })->name('u.dashboard');
        Route::get('/profile', function () {
            return Inertia::render('frontend/users/profile');
        })->name('u.profile');
        Route::get('/wishlist', function () {
            return Inertia::render('frontend/users/wishlist');
        })->name('u.wishlist');
        Route::get('/history', function () {
            return Inertia::render('frontend/users/dashboard');
        })->name('u.history');
        Route::get('/vip', function () {
            return Inertia::render('frontend/users/vip');
        })->name('u.vip');
    });
});

Route::middleware(['auth', 'verified', 'admin.access'])->group(function () {

    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index')->can('view_permissions');
    Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store')->can('create_permissions');
    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update')->can('edit_permissions');
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy')->can('delete_permissions');

    // Routes prefix
    Route::prefix('roles')->group(function () {
        // Add your roles routes here
        Route::get('/', [RoleController::class, 'index'])->name('roles.index')->can('view_roles');
        Route::post('/', [RoleController::class, 'store'])->name('roles.store')->can('create_roles');
        Route::get('/create', [RoleController::class, 'create'])->name('roles.create')->can('create_roles');
        Route::get('/{role}', [RoleController::class, 'show'])->name('roles.show')->can('view_roles');
        Route::get('/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit')->can('edit_roles');
        Route::put('/{role}', [RoleController::class, 'update'])->name('roles.update')->can('edit_roles');
        Route::delete('/{role}', [RoleController::class, 'destroy'])->name('roles.destroy')->can('delete_roles');
        // Add your settings routes here
    });

    Route::prefix('users')->group(function () {
        // Add your users routes here
        Route::get('/', [UserController::class, 'index'])->name('users.index')->can('view_users');
        Route::post('/', [UserController::class, 'store'])->name('users.store')->can('create_users');
        Route::get('/create', [UserController::class, 'create'])->name('users.create')->can('create_users');
        Route::get('/{user}', [UserController::class, 'show'])->name('users.show')->can('view_users');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('users.edit')->can('edit_users');
        Route::put('/{user}', [UserController::class, 'update'])->name('users.update')->can('edit_users');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('users.destroy')->can('delete_users');
        // Add your settings routes here
    });

    Route::prefix('categories')->group(function () {
        // Add your categories routes here
        Route::get('/', [CategoryController::class, 'index'])->name('categories.index')->can('view_categories');
        Route::post('/', [CategoryController::class, 'store'])->name('categories.store')->can('create_categories');
        Route::get('create', [CategoryController::class, 'create'])->name('categories.create')->can('create_categories');
        Route::get('{category}', [CategoryController::class, 'show'])->name('categories.show')->can('view_categories');
        Route::get('{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit')->can('edit_categories');
        Route::put('{category}', [CategoryController::class, 'update'])->name('categories.update')->can('edit_categories');
        Route::delete('{category}', [CategoryController::class, 'destroy'])->name('categories.destroy')->can('delete_categories');
    });

    Route::prefix('tags')->group(function () {
        // Add your tags routes here
        Route::get('/', [TagController::class, 'index'])->name('tags.index')->can('view_tags');
        Route::post('/', [TagController::class, 'store'])->name('tags.store')->can('create_tags');
        Route::put('{tag}', [TagController::class, 'update'])->name('tags.update')->can('edit_tags');
        Route::delete('{tag}', [TagController::class, 'destroy'])->name('tags.destroy')->can('delete_tags');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
