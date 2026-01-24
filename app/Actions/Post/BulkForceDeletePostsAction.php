<?php

namespace App\Actions\Post;

use App\Repositories\Contracts\PostRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class BulkForceDeletePostsAction
{
    public function __construct(private readonly PostRepositoryInterface $repository) {}

    /** @param array<int,int> $ids */
    public function handle(array $ids): int
    {
        // 1. Fetch posts BEFORE deleting to get image paths
        $posts = $this->repository->getByIdsIncludingTrashed($ids, ['id', 'image']);

        // 2. Perform database deletion
        $affected = $this->repository->forceDeleteMany($ids);

        // 3. If successful, clean up the files
        if ($affected > 0) {
            foreach ($posts as $post) {
                if ($post->image) {
                    Storage::disk('public')->delete($post->image);
                }
            }
        }

        return $affected;
    }
}
