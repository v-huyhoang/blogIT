<?php

namespace App\Http\Controllers\Frontend;

use App\Factories\SeoFactory;
use App\Http\Controllers\Controller;
use App\Services\Frontend\CategoryService;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService,
        protected SeoFactory $seoFactory
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('frontend/categories/index', [
            'pageSeo' => $this->seoFactory->categoryIndex(),
            'categories' => fn () => $this->categoryService->getCategoriesWithPosts(),
        ]);
    }
}
