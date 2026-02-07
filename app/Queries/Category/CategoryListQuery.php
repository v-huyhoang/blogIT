<?php

namespace App\Queries\Category;

use App\DTOs\Category\CategoryFilterDTO;
use App\Queries\BaseQueryObject;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class CategoryListQuery extends BaseQueryObject
{
    public function __construct(
        private readonly CategoryRepositoryInterface $repository,
    ) {}

    public function execute(
        CategoryFilterDTO $queryDTO,
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
        return ['id', 'name', 'slug', 'parent_id', 'is_active', 'created_at'];
    }
}
