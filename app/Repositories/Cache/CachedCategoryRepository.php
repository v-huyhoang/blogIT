<?php

declare(strict_types=1);

namespace App\Repositories\Cache;

use App\DTOs\Category\CategoryFilterDTO;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Pagination\LengthAwarePaginator;

final class CachedCategoryRepository extends CachedRepository implements CategoryRepositoryInterface
{
    public function getAll($onlyRoot, CategoryFilterDTO $dto): LengthAwarePaginator
    {
        if (! $this->inner instanceof CategoryRepositoryInterface) {
            throw new RepositoryException('Inner repository does not implement PostRepositoryInterface.');
        }

        return $this->inner->getAll($onlyRoot, $dto);
    }
}
