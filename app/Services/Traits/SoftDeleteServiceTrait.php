<?php

declare(strict_types=1);

namespace App\Services\Traits;

use App\Repositories\Contracts\SoftDeletesRepository;

/**
 * Trait SoftDeleteServiceTrait
 *
 * @property SoftDeletesRepository $repository
 */
trait SoftDeleteServiceTrait
{
    /**
     * Restore a soft-deleted model by ID.
     */
    public function restore(int|string $id): bool
    {
        return $this->repository->restore($id);
    }

    /**
     * Permanently remove a model by ID.
     */
    public function forceDelete(int|string $id): bool
    {
        return $this->repository->forceDelete($id);
    }

    /**
     * Restore multiple soft-deleted models by IDs.
     *
     * @param  array<int, int|string>  $ids
     */
    public function bulkRestore(array $ids): int
    {
        return $this->repository->restoreMany($ids);
    }

    /**
     * Permanently remove multiple models by IDs.
     *
     * @param  array<int, int|string>  $ids
     */
    public function bulkForceDelete(array $ids): int
    {
        return $this->repository->forceDeleteMany($ids);
    }
}
