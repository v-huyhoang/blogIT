<?php

namespace App\DTOs\Tag;

readonly class TagFilterDTO
{
    public function __construct(
        public readonly array $filters,
        public readonly string $sortField,
        public readonly string $sortDirection,
        public readonly int $perPage,
        public readonly int $page,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            filters: array_merge($data, [
                'sort' => $data['sort'] ?? 'id',
            ]),
            sortField: $data['sort'] ?? 'id',
            sortDirection: $data['direction'] ?? config('constant.DEFAULT_FILTERS.SORT_DIRECTION'),
            perPage: (int) (
                $data['per_page'] ?? config('constant.DEFAULT_FILTERS.PER_PAGE')
            ),
            page: (int) (
                $data['page'] ?? config('constant.DEFAULT_FILTERS.PAGE')
            ),
        );
    }
}
