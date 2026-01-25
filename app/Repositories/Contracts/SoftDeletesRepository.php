<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Interface SoftDeletesRepository
 */
interface SoftDeletesRepository
{
    /**
     * Restore a soft-deleted model by its primary key.
     *
     *
     * @throws ModelNotFoundException
     */
    public function restore(int|string $id): bool;

    /**
     * Restore multiple soft-deleted models by their primary keys.
     *
     * @param  array<int, int|string>  $ids
     * @return int Number of restored records
     */
    public function restoreMany(array $ids): int;

    /**
     * Permanently remove a model by its primary key.
     *
     *
     * @throws ModelNotFoundException
     */
    public function forceDelete(int|string $id): bool;

    /**
     * Permanently remove multiple models by their primary keys.
     *
     * @param  array<int, int|string>  $ids
     * @return int Number of permanently deleted records
     */
    public function forceDeleteMany(array $ids): int;
}
