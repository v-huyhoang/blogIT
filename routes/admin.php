<?php

use App\Http\Controllers\Admin\PostBulkController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PostDuplicateController;
use App\Http\Controllers\Admin\PostPublishController;
use App\Http\Controllers\Admin\PostViewController;
use App\Http\Controllers\Admin\TagController;

Route::resource('posts', PostController::class);

// Bulk action routes
Route::prefix('posts/bulk')->name('posts.bulk.')->group(function () {
    Route::post('/', [PostBulkController::class, 'destroy'])->name('destroy');          // soft delete many
    Route::post('/restore', [PostBulkController::class, 'restore'])->name('restore');    // restore many
    Route::post('/force', [PostBulkController::class, 'forceDestroy'])->name('force'); // force delete many
});

// Publish / Unpublish
Route::prefix('posts/{post}')->name('posts.')->group(function () {
    Route::put('/publish', [PostPublishController::class, 'publish'])->name('publish');
    Route::put('/unpublish', [PostPublishController::class, 'unpublish'])->name('unpublish');
    Route::post('/view', PostViewController::class)->name('view.increment');

    // Duplicate
    Route::post('/duplicate', [PostDuplicateController::class, 'duplicate'])->name('duplicate');
});

Route::middleware(['can:view_tags'])->group(function () {
    Route::get('tags', [TagController::class, 'index'])->name('tags.index');
});
Route::post('tags', [TagController::class, 'store'])->name('tags.store')->middleware('can:create_tags');
Route::put('tags/{tag}', [TagController::class, 'update'])->name('tags.update')->middleware('can:edit_tags');
Route::delete('tags/{tag}', [TagController::class, 'destroy'])->name('tags.destroy')->middleware('can:delete_tags');
