<?php

namespace App\Services\Frontend;

use App\Http\Resources\AuthorResource;
use App\Http\Resources\PostResource;
use App\Models\User;
use App\Repositories\Contracts\PostRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class HomeService
{
    public function __construct(
        protected PostRepositoryInterface $postRepository,
        protected UserRepositoryInterface $userRepository,
    ) {}

    public function getLatestPosts(): AnonymousResourceCollection
    {
        return PostResource::collection($this->postRepository->getLatestPosts());
    }

    public function getFeaturedPosts(): AnonymousResourceCollection
    {
        return PostResource::collection($this->postRepository->getFeaturedPosts());
    }

    public function getTopAuthors(): AnonymousResourceCollection
    {
        return AuthorResource::collection($this->userRepository->getTopAuthors());
    }

    public function getTrendingPosts(): AnonymousResourceCollection
    {
        return PostResource::collection($this->postRepository->getTrendingPosts());
    }

    public function getPersonalizedFeed(?User $user = null): AnonymousResourceCollection
    {
        return PostResource::collection($this->postRepository->getPersonalizedFeed($user));
    }
}
