<?php

namespace App\Actions\Post;

use App\Repositories\Contracts\PostRepositoryInterface;

class BulkRestorePostsAction
{
    public function __construct(private readonly PostRepositoryInterface $repository) {}

    /** @param array<int,int> $ids */
    public function handle(array $ids): int
    {
        return $this->repository->restoreMany($ids);
    }
}
