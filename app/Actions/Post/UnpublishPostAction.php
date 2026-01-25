<?php

namespace App\Actions\Post;

use App\Enums\PostStatus;
use App\Exceptions\PostException;
use App\Models\Post;
use App\Repositories\Contracts\PostRepositoryInterface;

class UnpublishPostAction
{
    public function __construct(private PostRepositoryInterface $postRepository) {}

    public function handle(Post $post): Post
    {
        $post = $this->postRepository->findForUpdate($post->id);

        if ($post->status !== PostStatus::Published) {
            throw new PostException('Post is not published');
        }

        return $this->postRepository->unpublish($post);
    }
}
