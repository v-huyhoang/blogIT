<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Services\Frontend\TagService;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    public function __construct(
        protected TagService $tagService
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('frontend/tags/index', [
            'tags' => Inertia::defer(fn () => $this->tagService->getTagsWithPosts()),
        ]);
    }
}
