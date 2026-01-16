<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\Post;
use App\Repositories\Contracts\PostRepositoryInterface;

final class PostRepository extends SoftDeleteRepository implements PostRepositoryInterface
{
    public function model(): string
    {
        return Post::class;
    }
}
