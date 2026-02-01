<?php

namespace App\Console\Commands;

use App\Jobs\PublishPostJob;
use App\Models\Post;
use App\Models\User;
use App\Notifications\Post\PostBatchPublishedForAdminNotification;
use Illuminate\Bus\Batch;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class PublishScheduledPosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:publish-scheduled-posts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish scheduled posts';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $postIds = Post::scheduledToPublish()->pluck('id')->toArray();

        if (empty($postIds)) {
            $this->info('No scheduled posts are currently due for publishing.');

            return;
        }

        $jobs = [];
        foreach ($postIds as $id) {
            $jobs[] = new PublishPostJob($id);
        }

        Bus::batch($jobs)
            ->name('Publish Scheduled Posts')
            ->finally(function (Batch $batch) use ($postIds) {
                $publishedPostIds = Post::whereIn('id', $postIds)
                    ->published()
                    ->pluck('id')
                    ->all();

                if (empty($publishedPostIds)) {
                    return;
                }

                $admins = User::admins()->oldest()->get();

                Notification::send(
                    $admins,
                    new PostBatchPublishedForAdminNotification($publishedPostIds)
                );
            })
            ->dispatch();

        $count = count($postIds);
        $this->info('Dispatched '.$count.' '.Str::plural('post', $count).' for publishing.');
    }
}
