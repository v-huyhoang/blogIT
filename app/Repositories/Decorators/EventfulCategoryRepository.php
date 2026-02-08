<?php

declare(strict_types=1);

namespace App\Repositories\Decorators;

use App\DTOs\Category\CategoryFilterDTO;
use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @property CategoryRepositoryInterface $inner
 */
final class EventfulCategoryRepository extends EventfulRepository implements CategoryRepositoryInterface
{
    /**
     * @param  CategoryRepositoryInterface  $inner  The inner repository (enforced by type hint and check).
     */
    public function __construct(
        BaseRepositoryInterface $inner,
        string $namespace
    ) {
        if (! $inner instanceof CategoryRepositoryInterface) {
            throw new RepositoryException('Inner repository must implement CategoryRepositoryInterface');
        }

        parent::__construct($inner, $namespace);
    }

    public function getAll($onlyRoot, CategoryFilterDTO $dto): LengthAwarePaginator
    {
        return $this->inner->getAll($onlyRoot, $dto);
    }
}
