<?php

namespace App\Services;

use App\DTOs\Category\CreateCategoryDTO;
use App\DTOs\Category\UpdateCategoryDTO;
use App\Repositories\CategoryRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryService
{
    protected $categoryRepository;

    /**
     * Inject Category repository
     *
     * @param CategoryRepository
     */
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Get all category with params
     *
     * @param  bool  $onlyRoot
     */
    public function getAll($onlyRoot = false): LengthAwarePaginator
    {
        return $this->categoryRepository->getAll($onlyRoot);
    }

    /**
     * Store a new category
     */
    public function store(CreateCategoryDTO $dto): void
    {
        $this->categoryRepository->create([
            'name' => $dto->name,
            'description' => $dto->description,
            'parent_id' => $dto->parent_id,
            'is_active' => $dto->is_active,
        ]);
    }

    /**
     * Update an existing category
     */
    public function update(int $id, UpdateCategoryDTO $dto): void
    {
        $this->categoryRepository->update($id, [
            'name' => $dto->name,
            'description' => $dto->description,
            'parent_id' => $dto->parent_id,
            'is_active' => $dto->is_active,
        ]);
    }

    /**
     * Delete an existing category
     */
    public function delete(int $id): void
    {
        $this->categoryRepository->delete($id);
    }
}
