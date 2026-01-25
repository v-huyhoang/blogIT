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

    /**
     * Publish a post.
     *
     * Publishes a post. The post must be published already.
     */
    public function publish(Post $post): RedirectResponse
    {
        $this->publish->handle($post);

        return back()->with('message', 'Post published.');
    }

    /**
     * Unpublish a post.
     */
    public function unpublish(Post $post): RedirectResponse
    {
        $this->unpublish->handle($post);

        return back()->with('message', 'Post unpublished.');
    }
}
