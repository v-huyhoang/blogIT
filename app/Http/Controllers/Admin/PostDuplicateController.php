<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Post\DuplicatePostAction;
use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;

final class PostDuplicateController extends Controller
{
    public function __construct(
        private readonly DuplicatePostAction $duplicate,
    ) {}

    public function duplicate(Post $post): RedirectResponse
    {
        // $this->authorize('duplicate', $post);

        $newPost = $this->duplicate->handle($post);

        return to_route('admin.posts.edit', $newPost)->with('message', 'Post duplicated.');
    }
}
