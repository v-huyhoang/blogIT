<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Services\Frontend\CategoryService;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('frontend/categories/index', [
            'categories' => Inertia::defer(fn () => $this->categoryService->getCategoriesWithPosts()),
        ]);
    }
}
