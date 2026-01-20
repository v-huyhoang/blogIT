<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Post;

interface PostRepositoryInterface extends BaseRepositoryInterface, SoftDeletesRepository
{
    /**
     * Duplicate a post and its tags.
     */
    public function duplicate(Post $model): Post;

    /**
     * Publish a post.
     */
    public function publish(Post $model): Post;

    /**
     * Unpublish a post.
     */
    public function unpublish(Post $model): Post;
}
