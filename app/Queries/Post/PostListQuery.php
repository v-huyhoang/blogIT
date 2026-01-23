<?php

namespace App\Queries\Post;

use App\DTOs\Post\PostQueryDTO;
use App\Queries\BaseQueryObject;
use App\Repositories\Contracts\PostRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class PostListQuery extends BaseQueryObject
{
    public function __construct(
        private readonly PostRepositoryInterface $repository,
    ) {}

    public function execute(
        PostQueryDTO $queryDTO,
        array $relations = []
    ): LengthAwarePaginator {
        $filterArray = $queryDTO->filters;

        if ($queryDTO->sortField) {
            $filterArray['sort'] = $queryDTO->sortDirection === 'desc'
                ? "-{$queryDTO->sortField}"
                : $queryDTO->sortField;
        }

        return $this->repository->paginate(
            perPage: $queryDTO->perPage,
            columns: $this->getColumns(),
            filters: $filterArray,
            relations: $relations,
        );
    }

    /**
     * Returns the default columns to be retrieved from the database.
     *
     * @return array<string> The default columns to be retrieved.
     */
    private function getColumns(): array
    {
        return ['id', 'user_id', 'category_id', 'title', 'slug', 'status', 'image', 'views_count', 'comments_count', 'likes_count', 'published_at', 'created_at'];
    }
}
