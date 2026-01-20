<?php

namespace App\DTOs\Post;

use App\DTOs\BaseDTO;

final class PaginationDTO extends BaseDTO
{
    public function __construct(
        public readonly int $perPage = 15,
        public readonly int $page = 1,
    ) {}
}
