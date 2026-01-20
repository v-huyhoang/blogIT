<?php

namespace App\Queries\Post;

use App\Models\Post;
use App\Queries\BaseQueryObject;
use App\Repositories\Contracts\PostRepositoryInterface;

final class PostDetailQuery extends BaseQueryObject
{
    public function __construct(
        private readonly PostRepositoryInterface $repository,
    ) {}

    public function byId(int $id, array $relations = []): ?Post
    {
        return $this->repository->find($id, $relations);
    }

    public function bySlug(string $slug, array $relations = []): ?Post
    {
        return $this->repository->findBy('slug', $slug, $relations);
    }
}
