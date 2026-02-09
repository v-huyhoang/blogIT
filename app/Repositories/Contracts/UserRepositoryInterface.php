<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Get top authors based on post count.
     */
    public function getTopAuthors(int $limit = 4): Collection;
}
