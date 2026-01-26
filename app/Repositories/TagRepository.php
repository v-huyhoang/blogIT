<?php

namespace App\Repositories;

use App\DTOs\Tag\TagFilterDTO;
use App\Models\Tag;
use Illuminate\Pagination\LengthAwarePaginator;

class TagRepository
{
    /**
     * The Tag model instance.
     */
    protected Tag $model;

    /**
     * TagRepository constructor.
     */
    public function __construct(Tag $model)
    {
        $this->model = $model;
    }

    /**
     * Get all tags by params
     */
    public function getAll(TagFilterDTO $dto): LengthAwarePaginator
    {
        return $this->model
            ->search($dto->search)
            ->filter($dto->filters)
            ->orderBy($dto->sort, 'desc')
            ->paginate($dto->perPage);
    }

    /**
     * Find Tag by ID
     */
    public function find(int $id): ?Tag
    {
        return $this->model->find($id);
    }

    /**
     * Create new Tag
     */
    public function create(array $attributes): Tag
    {
        return $this->model->create($attributes);
    }

    /**
     * Update Tag by ID
     *
     * @param  array<string, mixed>  $data
     */
    public function update(int $id, array $data): bool
    {
        $tag = $this->model->findOrFail($id);

        return $tag->update($data);
    }

    /**
     * Delete Tag by ID
     *
     *
     * @throws \Exception
     */
    public function delete(int $id): ?bool
    {
        $tag = $this->model->findOrFail($id);

        return $tag->delete();
    }
}
