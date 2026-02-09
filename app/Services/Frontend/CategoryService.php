<?php

namespace App\Services\Frontend;

use App\Http\Resources\CategoryResource;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryService
{
    public function __construct(
        protected CategoryRepositoryInterface $categoryRepository
    ) {}

    public function getCategoriesWithPosts(): AnonymousResourceCollection
    {
        return CategoryResource::collection($this->categoryRepository->getActiveWithPosts());
    }
}
