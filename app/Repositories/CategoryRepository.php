<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryRepository
{
    /**
     * The Category model instance.
     */
    protected Category $model;

    /**
     * CategoryRepository constructor.
     */
    public function __construct(Category $model)
    {
        $this->model = $model;
    }

    /**
     * Get all category by params
     */
    public function getAll($onlyRoot = false): LengthAwarePaginator
    {
        $query = $this->model->with('childrenRecursive');

        if ($onlyRoot) {
            $query->whereNull('parent_id');
        }

        return $query->orderBy('id', 'desc')->paginate(10);
    }

    /**
     * Find Category by ID
     */
    public function find(int $id): ?Category
    {
        return $this->model->find($id);
    }

    /**
     * Create new Category
     *
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): Category
    {
        return $this->model->create($data);
    }

    /**
     * Update category by ID
     *
     * @param  array<string, mixed>  $data
     */
    public function update(int $id, array $data): bool
    {
        $category = $this->model->findOrFail($id);

        return $category->update($data);
    }

    /**
     * Delete category by ID
     *
     *
     * @throws \Exception
     */
    public function delete(int $id): ?bool
    {
        $category = $this->model->findOrFail($id);
        $category->children()->delete();

        return $category->delete();
    }
}
