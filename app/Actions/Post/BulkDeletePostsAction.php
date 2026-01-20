<?php

namespace App\Actions\Post;

use App\Repositories\Contracts\PostRepositoryInterface;

class BulkDeletePostsAction
{
    public function __construct(private readonly PostRepositoryInterface $repository) {}

    /** @param array<int,int> $ids */
    public function handle(array $ids): int
    {
        return $this->repository->deleteMany($ids);
    }
}
