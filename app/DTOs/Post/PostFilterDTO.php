<?php

namespace App\DTOs\Post;

use App\DTOs\BaseDTO;

final class PostFilterDTO extends BaseDTO
{
    public function __construct(
        public readonly ?string $q,
        public readonly ?string $status,
        public readonly ?int $categoryId,
        public readonly ?int $userId,
        public readonly ?int $tagId,
        public readonly ?string $trashed,
        public readonly ?string $publishedAtFrom,
        public readonly ?string $publishedAtTo,
        public readonly ?string $sort,
        public readonly ?string $direction,
        public readonly ?int $perPage,
    ) {}

    public function toArray(array $except = []): array
    {
        return array_filter([
            'q' => $this->q,
            'status' => $this->status,
            'category_id' => $this->categoryId,
            'user_id' => $this->userId,
            'tag_id' => $this->tagId,
            'trashed' => $this->trashed,
            'published_at_from' => $this->publishedAtFrom,
            'published_at_to' => $this->publishedAtTo,
            'sort' => $this->sort,
            'direction' => $this->direction,
            'per_page' => $this->perPage,
        ], static fn ($v) => ! is_null($v));
    }
}
