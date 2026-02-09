<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Services\Frontend\HomeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(protected HomeService $homeService) {}

    public function __invoke(Request $request): Response
    {
        return Inertia::render('welcome', [
            'latestPosts' => Inertia::defer(fn () => $this->homeService->getLatestPosts()),
            'featuredPosts' => Inertia::defer(fn () => $this->homeService->getFeaturedPosts()),

            'topAuthors' => Inertia::defer(fn () => $this->homeService->getTopAuthors(), 'homeParallel'),
            'trendingPosts' => Inertia::defer(fn () => $this->homeService->getTrendingPosts(), 'homeParallel'),
            'personalizedFeed' => Inertia::defer(
                fn () => $this->homeService->getPersonalizedFeed($request->user()),
                'homeParallel'
            ),
        ]);
    }
}
