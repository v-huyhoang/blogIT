<?php

namespace App\Actions\Post;

use App\Enums\PostStatus;
use App\Models\Post;
use App\Repositories\Contracts\PostRepositoryInterface;
use DomainException;

class UnpublishPostAction
{
    public function __construct(private PostRepositoryInterface $postRepository) {}

    public function handle(Post $post): Post
    {
		$post = $this->postRepository->findForUpdate($post->id);

		if ($post->status === PostStatus::Published->value) {
			throw new DomainException('Already Unpublished');
		}
        return $this->postRepository->unpublish($post);
    }
}
