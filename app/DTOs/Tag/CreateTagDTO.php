<?php

namespace App\DTOs\Tag;

final class CreateTagDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $slug,

    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
            slug: $data['slug'],
        );
    }
}
