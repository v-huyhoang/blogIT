<?php

namespace App\Services;

use App\DTOs\Post\PostFilterDTO;
use App\Repositories\Contracts\PostRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PostService
{
    public function __construct(private PostRepositoryInterface $postRepository) {}

    public function getPosts(?PostFilterDTO $filters = null, array $relations = []): LengthAwarePaginator
    {
        $perPage = $filters->perPage ?? 15;
        $orderBy = [];
        if ($filters?->sort) {
            $orderBy[$filters->sort] = $filters->direction ?? 'desc';
        } else {
            $orderBy['created_at'] = 'desc';
        }

        // Pass all DTO data as filters. BaseRepository handles 'q' and 'scopeFilter'.
        // We exclude 'includes' here just in case, though DTO no longer has it.
        $filterData = $filters ? $filters->toArray() : [];

        return $this->postRepository->paginate(
            perPage: $perPage,
            filters: $filterData,
            relations: $relations,
            orderBy: $orderBy
        );
    }
}
