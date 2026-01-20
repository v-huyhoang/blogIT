<?php

namespace App\DTOs\Post;

use App\DTOs\BaseDTO;

final class SortDTO extends BaseDTO
{
    public function __construct(
        public readonly string $field = 'created_at',
        public readonly string $direction = 'desc',
    ) {}

    public function toOrderBy(): array
    {
        return [$this->field => $this->direction];
    }
}
