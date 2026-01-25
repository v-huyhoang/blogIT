<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

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

    public function getByIdsIncludingTrashed(array $ids, array $columns = ['*']): Collection;
}
