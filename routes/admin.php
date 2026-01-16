<?php

use App\Http\Controllers\Admin\PostController;

Route::resource('posts', PostController::class)->except('show');
// Route::post('posts/bulk', [PostController::class, 'bulk'])->name('posts.bulk');
