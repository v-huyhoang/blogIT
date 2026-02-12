<?php

namespace App\Http\Controllers\Frontend;

use App\Factories\SeoFactory;
use App\Http\Controllers\Controller;
use App\Services\Frontend\TagService;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    public function __construct(
        protected TagService $tagService,
        protected SeoFactory $seoFactory
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('frontend/tags/index', [
            'pageSeo' => $this->seoFactory->tagIndex(),
            'tags' => fn () => $this->tagService->getTagsWithPosts(),
        ]);
    }
}
