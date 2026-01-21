<?php

namespace App\DTOs\Post;

use App\DTOs\BaseDTO;
use Carbon\Carbon;

class PostDTO extends BaseDTO
{
    public function __construct(
        public readonly string $title,
        public readonly ?string $slug,
        public readonly ?string $excerpt,
        public readonly string $content,
        public readonly string $status,
        public readonly ?Carbon $published_at,
        public readonly ?int $category_id,
        public readonly ?int $user_id = null,
        public readonly array $tag_ids = [],
    ) {}
}
