<?php

namespace App\Services\Frontend;

use App\Http\Resources\TagResource;
use App\Repositories\Contracts\TagRepositoryInterface;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TagService
{
    public function __construct(
        protected TagRepositoryInterface $tagRepository
    ) {}

    public function getTagsWithPosts(): AnonymousResourceCollection
    {
        return TagResource::collection($this->tagRepository->getActiveWithPosts());
    }
}
