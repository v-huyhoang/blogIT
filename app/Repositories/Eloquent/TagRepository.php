<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Enums\PostStatus;
use App\Models\Tag;
use App\Repositories\Contracts\TagRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

final class TagRepository extends BaseRepository implements TagRepositoryInterface
{
    public function model(): string
    {
        return Tag::class;
    }

    public function getActiveWithPosts(): Collection
    {
        return $this->query()
            ->whereHas('posts', function ($query) {
                $query->where('status', PostStatus::Published->value);
            })
            ->withCount(['posts' => function ($query) {
                $query->where('status', PostStatus::Published->value);
            }])
            ->orderBy('name')
            ->get();
    }
}
