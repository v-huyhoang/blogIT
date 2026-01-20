<?php

namespace App\Services;

use App\Models\Post;
use App\Repositories\Contracts\PostRepositoryInterface;
use App\Services\Traits\BulkDeleteServiceTrait;
use App\Services\Traits\TransactionTrait;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PostService
{
    use BulkDeleteServiceTrait;
    use TransactionTrait;

    public function __construct(private PostRepositoryInterface $repository) {}

    public function createPost(array $data): Post
    {
        return $this->transaction(function () use ($data) {
            $tagIds = $data['tag_ids'] ?? [];
            unset($data['tag_ids']);

            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $data['image'] = $data['image']->store('posts', 'public');
            }

            $post = $this->repository->create($data);

            if (! empty($tagIds)) {
                $post->tags()->sync($tagIds);
            }

            return $post;
        });
    }

    public function updatePost(Post $post, array $data): Post
    {
        return $this->transaction(function () use ($post, $data) {
            $tagIds = $data['tag_ids'] ?? [];
            unset($data['tag_ids']);

            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                if ($post->image) {
                    Storage::disk('public')->delete($post->image);
                }
                $data['image'] = $data['image']->store('posts', 'public');
            } elseif (array_key_exists('image', $data) && is_null($data['image'])) {
                if ($post->image) {
                    Storage::disk('public')->delete($post->image);
                }
            }

            $updatedPost = $this->repository->update($post->id, $data);

            if (isset($tagIds)) {
                $updatedPost->tags()->sync($tagIds);
            }

            return $updatedPost;
        });
    }

    public function deletePost(Post $post): bool
    {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        return $this->repository->delete($post->id);
    }
}
