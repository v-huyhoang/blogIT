<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Enums\PostStatus;
use App\Models\Post;
use App\Repositories\Contracts\PostRepositoryInterface;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

final class PostRepository extends SoftDeleteRepository implements PostRepositoryInterface
{
    public function model(): string
    {
        return Post::class;
    }

    /**
     * Duplicate a post and its tags.
     *
     * This method will create a new post with the same content and tags as the original post.
     * The new post will have the status set to "draft" and the published_at date set to null.
     * The title of the new post will be the same as the original post with "(Copy)" appended.
     * The slug of the new post will be the same as the original post with "-copy-" and the current date appended.
     */
    public function duplicate(Post $model): Post
    {
        return DB::transaction(function () use ($model) {
            $model->loadMissing('tags:id');

            $new = $model->replicate();

            $new->forceFill([
                'status' => PostStatus::Draft->value,
                'published_at' => null,
                'slug' => $model->slug.'-copy-'.now()->format('YmdHis'),
                'title' => $model->title.' (Copy)',
            ]);

            $new->save();

            // Sync tags to maintain the Aggregate state on the new copy
            $new->tags()->sync($model->tags->pluck('id')->all());

            return $new;
        });
    }

    /**
     * Publish a post.
     *
     * If the post is already published, it is left unchanged.
     */
    public function publish(Post $model): Post
    {
        if ($model->status === PostStatus::Published) {
            return $model;
        }

        $model->forceFill([
            'status' => PostStatus::Published->value,
            'published_at' => $model->published_at ?? Carbon::now(),
        ])->save();

        return $model;
    }

    /**
     * Unpublish a post.
     *
     * If the post is not published, it is left unchanged.
     */
    public function unpublish(Post $model): Post
    {
        if ($model->status !== PostStatus::Published) {
            return $model;
        }

        $model->forceFill([
            'status' => PostStatus::Draft->value,
            'published_at' => null,
        ])->save();

        return $model;
    }
}
