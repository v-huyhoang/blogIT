<?php

namespace App\Listeners;

use App\Events\PostPublished;
use App\Models\Post;
use App\Repositories\Cache\RepositoryCacheInvalidator;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PostPublishedHandler implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    public function __construct(
        private readonly RepositoryCacheInvalidator $cacheInvalidator
    ) {}

    public function handle(PostPublished $event): void
    {
        $post = Post::with('user')->find($event->postId);

        if (! $post || ! $post->user) {
            return;
        }

        // Clear post cache
        $this->cacheInvalidator->invalidate('PostRepository');

        // TODO: Notify Followers
    }
}
