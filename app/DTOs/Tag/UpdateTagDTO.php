<?php

namespace App\DTOs\Tag;

final class UpdateTagDTO
{
    public function __construct(
        public readonly string $name,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
        );
    }
}
