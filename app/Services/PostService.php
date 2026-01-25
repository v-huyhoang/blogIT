<?php

namespace App\Services;

use App\Models\Post;
use App\Repositories\Contracts\PostRepositoryInterface;
use App\Services\Traits\BulkDeleteServiceTrait;
use App\Services\Traits\TransactionTrait;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
                $slug = $data['slug'] ?? Str::slug($data['title'] ?? Str::random(10));
                $filename = $slug.'.'.$data['image']->getClientOriginalExtension();
                $data['image'] = $data['image']->storeAs('posts', $filename, 'public');
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

                $slug = $data['slug'] ?? $post->slug;
                $filename = $slug.'.'.$data['image']->getClientOriginalExtension();
                $data['image'] = $data['image']->storeAs('posts', $filename, 'public');
            } elseif (array_key_exists('image', $data) && empty($data['image'])) {
                // Handle case where image is set to null/empty to remove it
                if ($post->image) {
                    Storage::disk('public')->delete($post->image);
                }
                $data['image'] = null;
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
        return $this->repository->delete($post->id);
    }
}
