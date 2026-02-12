<?php

namespace App\DTOs\Seo;

class PageSeoDTO
{
    public function __construct(
        public string $title,
        public string $description,
        public ?string $image = null,
        public string $type = 'website',
        public ?array $pagination = null,
        public array $schema = [],
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'type' => $this->type,
            'pagination' => $this->pagination,
            'schema' => $this->schema,
        ]);
    }
}
