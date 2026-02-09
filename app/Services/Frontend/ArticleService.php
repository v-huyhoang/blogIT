<?php

namespace App\Services\Frontend;

use App\DTOs\Post\PostQueryDTO;
use App\Enums\PostStatus;
use App\Http\Resources\PostDetailResource;
use App\Http\Resources\PostResource;
use App\Repositories\Contracts\PostRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ArticleService
{
    public function __construct(
        protected PostRepositoryInterface $postRepository
    ) {}

    public function getArticles(PostQueryDTO $queryDTO): LengthAwarePaginator
    {
        $filters = $queryDTO->filters;
        $filters['status'] = PostStatus::Published->value;

        // Ensure sorting is applied via filters for the pipeline
        $filters['sort'] = $filters['sort'] ?? $queryDTO->sortField;
        $filters['direction'] = $filters['direction'] ?? $queryDTO->sortDirection;

        // Map 'search' to 'q' for SearchFilter
        if (! empty($filters['search'])) {
            $filters['q'] = $filters['search'];
        }

        $posts = $this->postRepository->paginate(
            perPage: $queryDTO->perPage,
            columns: ['*'],
            filters: $filters,
            relations: ['user:id,name', 'category:id,name']
        );

        return $posts->through(fn ($post) => (new PostResource($post))->resolve());
    }

    public function getArticleBySlug(string $slug): PostDetailResource
    {
        $post = $this->postRepository->findBy('slug', $slug, ['*'], ['user', 'category', 'tags']);

        if (! $post || ! $post->published_at) {
            abort(404);
        }

        return new PostDetailResource($post);
    }

    public function getRelatedPosts(int $postId, int $categoryId, int $limit = 3): AnonymousResourceCollection
    {
        $filters = [
            'status' => PostStatus::Published->value,
            'category_id' => $categoryId,
        ];

        $posts = $this->postRepository->paginate(
            perPage: $limit + 1,
            columns: ['*'],
            filters: $filters,
            relations: ['user:id,name', 'category:id,name']
        );

        $filtered = collect($posts->items())
            ->reject(fn ($p) => $p->id === $postId)
            ->take($limit);

        return PostResource::collection($filtered);
    }
}
