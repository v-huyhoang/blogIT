<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class PostViewController extends Controller
{
    /**
     * Increment the views count for the specified post.
     */
    public function __invoke(Post $post): JsonResponse
    {
        $post->increment('views_count');

        return response()->json([
            'success' => true,
            'views_count' => $post->views_count,
        ]);
    }
}
