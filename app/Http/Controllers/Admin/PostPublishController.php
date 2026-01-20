<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Post\PublishPostAction;
use App\Actions\Post\UnpublishPostAction;
use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;

final class PostPublishController extends Controller
{
    public function __construct(
        private readonly PublishPostAction $publish,
        private readonly UnpublishPostAction $unpublish,
    ) {}

    public function publish(Post $post): RedirectResponse
    {
        // $this->authorize('publish', $post);

        $this->publish->handle($post);

        return back()->with('message', 'Post published.');
    }

    public function unpublish(Post $post): RedirectResponse
    {
        // $this->authorize('unpublish', $post);

        $this->unpublish->handle($post);

        return back()->with('message', 'Post unpublished.');
    }
}
