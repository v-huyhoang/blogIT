<?php

namespace App\Http\Controllers\Frontend;

use App\DTOs\Post\PostQueryDTO;
use App\Factories\SeoFactory;
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
        protected TagService $tagService,
        protected SeoFactory $seoFactory
    ) {}

    public function index(ArticleIndexRequest $request): Response
    {
        $queryDTO = PostQueryDTO::fromRequest($request->validated());
        $articles = $this->articleService->getArticles($queryDTO);

        return Inertia::render('frontend/articles/index', [
            'pageSeo' => $this->seoFactory->articlesIndex($articles),

            'articles' => fn () => $articles, // lazy load

            'filters' => $request->only(['search', 'category', 'tag', 'sort', 'direction']),

            'categories' => Inertia::once(fn () => $this->categoryService->getCategoriesWithPosts()),

            'tags' => Inertia::once(fn () => $this->tagService->getTagsWithPosts()),
        ]);
    }

    public function show(string $slug): Response
    {
        $article = $this->articleService->getArticleBySlug($slug);

        return Inertia::render('frontend/articles/show', [
            'pageSeo' => $article->seo(),
            'article' => $article,
            'relatedPosts' => Inertia::defer(fn () => $this->articleService->getRelatedPosts(
                $article->id,
                $article->category['id']
            )),
        ]);
    }
}
