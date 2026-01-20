<?php

namespace App\Queries\Post;

use App\DTOs\Post\PaginationDTO;
use App\DTOs\Post\PostFilterDTO;
use App\DTOs\Post\SortDTO;
use App\Queries\BaseQueryObject;
use App\Repositories\Contracts\PostRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class PostListQuery extends BaseQueryObject
{
    public function __construct(
        private readonly PostRepositoryInterface $repository,
    ) {}

    public function execute(
        PaginationDTO $pagination,
        SortDTO $sort,
        PostFilterDTO $filters,
        array $relations = []
    ): LengthAwarePaginator {
        $filterArray = $filters->toArray();

        if ($sort->field) {
            $filterArray['sort'] = $sort->direction === 'desc' ? "-{$sort->field}" : $sort->field;
        }

        return $this->repository->paginate(
            perPage: $pagination->perPage,
            columns: ['id', 'user_id', 'category_id', 'title', 'slug', 'status', 'image', 'views_count', 'comments_count', 'likes_count', 'published_at', 'created_at'],
            filters: $filterArray,
            relations: $relations,
        );
    }
}
