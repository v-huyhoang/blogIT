<?php

namespace App\DTOs\HandlePdf;

class CreateHandlePdfDTO
{
	public function __construct(
		public readonly string $title,
		public readonly int $type_pdf,
		public readonly string $description,
		public readonly string $file_path
	) {}

	public static function fromRequest(array $data): self
	{
		return new self(
			title: $data['title'],
			type_pdf: $data['type_pdf'],
			description: $data['description'] ?? '',
			file_path: $data['file_path']
		);
	}
}