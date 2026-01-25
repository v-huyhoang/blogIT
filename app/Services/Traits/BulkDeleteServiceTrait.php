<?php

declare(strict_types=1);

namespace App\Services\Traits;

use App\Repositories\Contracts\BaseRepositoryInterface;

/**
 * Trait BulkDeleteServiceTrait
 *
 * @property BaseRepositoryInterface $repository
 */
trait BulkDeleteServiceTrait
{
    /**
     * Delete multiple models by IDs.
     *
     * @param  array<int, int|string>  $ids
     * @return int Number of deleted records
     */
    public function bulkDelete(array $ids): int
    {
        return $this->repository->deleteMany($ids);
    }
}
