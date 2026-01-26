<?php

namespace App\DTOs\Tag;

readonly class TagFilterDTO
{
    public function __construct(
        public ?string $search,
        public array $filters,
        public ?string $sort,
        public int $perPage,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            search: $data['search'] ?? null,
            filters: array_filter([
                'slug' => $data['slug'] ?? null,
                // ...
            ], fn ($v) => ! is_null($v)),
            sort: $data['sort'] ?? 'id',
            perPage: (int) (
                $data['per_page']
                ?? config('constant.PAGINATION.PER_PAGE', 10)
            ),
        );
    }
}
