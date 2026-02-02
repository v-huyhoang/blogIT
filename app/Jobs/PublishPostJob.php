<?php

namespace App\Jobs;

use App\Enums\PostStatus;
use App\Events\PostPublished;
use App\Models\Post;
use DateTime;
use Illuminate\Bus\Batchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class PublishPostJob implements ShouldQueue
{
    use Batchable, Queueable;

    public int $tries = 3;

    public function backoff(): array
    {
        return [5, 30, 120];
    }

    public function retryUntil(): DateTime
    {
        return now()->addMinutes(10);
    }

    /**
     * Create a new job instance.
     */
    public function __construct(private readonly int $postId) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->batch()?->cancelled()) {
            return;
        }

        $postPublished = false;

        DB::transaction(function () use (&$postPublished) {
            $post = Post::whereKey($this->postId)->scheduledToPublish()->lockForUpdate()->first();

            if (! $post) {
                return;
            }

            $post->update([
                'status' => PostStatus::Published,
                'published_at' => now(),
                'publish_at' => null,
            ]);

            $postPublished = true;
        });

        // if post was published, notify
        if ($postPublished) {
            event(new PostPublished($this->postId));
        }
    }
}
