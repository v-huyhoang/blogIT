<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\DTOs\Category\CategoryFilterDTO;
use Illuminate\Pagination\LengthAwarePaginator;

interface CategoryRepositoryInterface extends BaseRepositoryInterface
{
    public function getAll($onlyRoot, CategoryFilterDTO $dto): LengthAwarePaginator;
}
