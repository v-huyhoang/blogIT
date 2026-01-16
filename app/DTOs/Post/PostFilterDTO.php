<?php

namespace App\DTOs\Post;

use App\DTOs\BaseDTO;

class PostFilterDTO extends BaseDTO
{
    public function __construct(
        public readonly ?string $q,
        public readonly ?string $sort,
        public readonly ?string $direction,
        public readonly ?int $perPage,
        public readonly ?int $category_id,
        public readonly ?string $status,
        public readonly ?int $user_id,
        public readonly ?int $tag_id,
        public readonly ?string $trashed
    ) {}
}
