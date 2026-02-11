<?php

namespace App\Http\Controllers\Frontend;

use App\DTOs\Post\PostQueryDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\ArticleIndexRequest;
use App\Services\Frontend\ArticleService;
use App\Services\Frontend\CategoryService;
use App\Services\Frontend\TagService;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function __construct(
        protected ArticleService $articleService,
        protected CategoryService $categoryService,
        protected TagService $tagService
    ) {}

    public function index(ArticleIndexRequest $request): Response
    {
        $queryDTO = PostQueryDTO::fromRequest($request->validated());

        return Inertia::render('frontend/articles/index', [
            'articles' => fn () => $this->articleService->getArticles($queryDTO), // lazy load

            'filters' => $request->only(['search', 'category', 'tag', 'sort', 'direction']),

            'categories' => Inertia::once(fn () => $this->categoryService->getCategoriesWithPosts()),

            'tags' => Inertia::once(fn () => $this->tagService->getTagsWithPosts()),
        ]);
    }

    public function show(string $slug): Response
    {
        $article = $this->articleService->getArticleBySlug($slug);

        return Inertia::render('frontend/articles/show', [
            'article' => $article,
            'relatedPosts' => Inertia::defer(fn () => $this->articleService->getRelatedPosts(
                $article->id,
                $article->category['id']
            )),
        ]);
    }
}
