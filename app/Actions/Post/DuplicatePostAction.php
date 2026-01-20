<?php

namespace App\Actions\Post;

use App\Enums\PostStatus;
use App\Models\Post;
use App\Repositories\Contracts\PostRepositoryInterface;
use DomainException;

class DuplicatePostAction
{
    public function __construct(private PostRepositoryInterface $postRepository) {}

    public function handle(Post $post): Post
    {
		$post = $this->postRepository->findForUpdate($post->id);

        return $this->postRepository->duplicate($post);
    }
}
