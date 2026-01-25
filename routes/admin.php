<?php

use App\Http\Controllers\Admin\PostBulkController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PostDuplicateController;
use App\Http\Controllers\Admin\PostPublishController;
use App\Http\Controllers\Admin\PostViewController;

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
