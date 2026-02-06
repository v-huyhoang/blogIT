<?php

namespace App\Http\Controllers;

use App\DTOs\Category\CreateCategoryDTO;
use App\DTOs\Category\UpdateCategoryDTO;
use App\Enums\Category;
use App\Http\Requests\Category\CategoryRequest;
use App\Http\Requests\Category\IndexCategoryRequest;
use App\Queries\Category\CategoryListQuery;
use App\Services\CategoryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    protected $categoryService;

    /**
     * Inject Category repository
     */
    public function __construct(CategoryService $categoryService, private CategoryListQuery $categoryListQuery)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Get all categories with full subcategories
     */
    public function index(IndexCategoryRequest $request): Response
    {
        $dto = $request->toQueryDTO();
        $categories = $this->categoryListQuery->execute($dto, [
            'childrenRecursive',
        ]);

        return Inertia::render('categories/index', [
            'categories' => $categories,
            'filters' => $dto->filters,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request): RedirectResponse
    {
        try {
            $dto = CreateCategoryDTO::fromRequest($request->validated());
            $this->categoryService->store($dto);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }

        return to_route('categories.index')->with('message', 'Category created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, int $id): RedirectResponse
    {
        try {
            $dto = UpdateCategoryDTO::fromRequest($request->validated());
            $this->categoryService->update($id, $dto);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }

        return to_route('categories.index')->with('message', 'Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return Response
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->categoryService->delete($id);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }

        return to_route('categories.index')->with('message', 'Category deleted successfully');
    }
}
