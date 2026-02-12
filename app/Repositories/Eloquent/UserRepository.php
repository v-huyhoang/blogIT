<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

final class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function model(): string
    {
        return User::class;
    }

    public function getTopAuthors(int $limit = 4): Collection
    {
        return $this->query()
            ->select(['id', 'name'])
            ->with(['roles:id,name'])
            ->withCount('posts')
            ->orderByDesc('posts_count')
            ->limit($limit)
            ->get();
    }
}
