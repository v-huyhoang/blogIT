<?php

namespace App\DTOs\Post;

use App\DTOs\BaseDTO;

final class PostQueryDTO extends BaseDTO
{
    public function __construct(
        public readonly array $filters = [],
        public readonly string $sortField = 'created_at',
        public readonly string $sortDirection = 'desc',
        public readonly int $perPage = 15,
        public readonly int $page = 1,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            filters: $data,
            sortField: $data['sort'] ?? 'created_at',
            sortDirection: $data['direction'] ?? 'desc',
            perPage: (int) ($data['per_page'] ?? 15),
            page: (int) ($data['page'] ?? 1),
        );
    }
}
