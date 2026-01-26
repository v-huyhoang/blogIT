<?php

namespace App\Services;

use App\Models\Tag;
use App\Repositories\Contracts\TagRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class TagService
{
    public function __construct(private readonly TagRepositoryInterface $tagRepository) {}

    public function getAll(array $columns, array $filters): LengthAwarePaginator
    {
        return $this->tagRepository->paginate(columns: $columns, filters: $filters);
    }

    public function createTag(array $data): Tag
    {
        return $this->tagRepository->create($data);
    }

    public function updateTag(Tag $tag, array $data): Tag
    {
        return $this->tagRepository->update($tag->id, $data);
    }

    public function deleteTag(Tag $tag): bool
    {
        return $this->tagRepository->delete($tag->id);
    }
}
