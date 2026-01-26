<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\Tag;
use App\Repositories\Contracts\TagRepositoryInterface;

final class TagRepository extends BaseRepository implements TagRepositoryInterface
{
    public function model(): string
    {
        return Tag::class;
    }
}
