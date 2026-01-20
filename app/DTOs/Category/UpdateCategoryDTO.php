<?php

namespace App\DTOs\Category;

final class UpdateCategoryDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $description,
        public readonly ?int $parent_id,
        public readonly bool $is_active,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
            description: $data['description'],
            parent_id: $data['parent_id'],
            is_active: $data['is_active'],
        );
    }
}
