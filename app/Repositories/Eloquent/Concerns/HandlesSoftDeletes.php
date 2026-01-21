<?php

namespace App\Repositories\Eloquent\Concerns;

use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Throwable;

/**
 * Trait HandlesSoftDeletes
 *
 * @property Model $model
 *
 * @method Builder query()
 * @method string model()
 */
trait HandlesSoftDeletes
{
    /**
     * Ensure the model uses SoftDeletes.
     *
     * @throws RepositoryException
     */
    protected function ensureSoftDeletes(): void
    {
        if (! in_array(SoftDeletes::class, class_uses_recursive($this->model), true)) {
            throw new RepositoryException('Model does not use SoftDeletes: '.$this->model());
        }
    }

    /**
     * Restore a soft-deleted model by its primary key.
     *
     *
     * @throws RepositoryException
     */
    public function restore(int|string $id): bool
    {
        $this->ensureSoftDeletes();

        try {
            /** @var Builder|SoftDeletes $query */
            $query = $this->query();
            $model = $query->withTrashed()->findOrFail($id);

            return (bool) $model->restore();
        } catch (Throwable $e) {
            throw new RepositoryException("Restore failed: {$this->model()}", 0, $e);
        }
    }

    /**
     * Restore multiple soft-deleted models by their primary keys.
     *
     * @param  array<int, int|string>  $ids
     *
     * @throws RepositoryException
     */
    public function restoreMany(array $ids): int
    {
        $this->ensureSoftDeletes();

        if ($ids === []) {
            return 0;
        }

        try {
            /** @var Builder|SoftDeletes $query */
            $query = $this->query();

            return (int) $query->withTrashed()->whereKey($ids)->restore();
        } catch (Throwable $e) {
            throw new RepositoryException("RestoreMany failed: {$this->model()}", 0, $e);
        }
    }

    /**
     * Permanently remove a model by its primary key.
     *
     *
     * @throws RepositoryException
     */
    public function forceDelete(int|string $id): bool
    {
        $this->ensureSoftDeletes();

        try {
            /** @var Builder|SoftDeletes $query */
            $query = $this->query();
            $model = $query->withTrashed()->findOrFail($id);

            return (bool) $model->forceDelete();
        } catch (Throwable $e) {
            throw new RepositoryException("ForceDelete failed: {$this->model()}", 0, $e);
        }
    }

    /**
     * Permanently remove multiple models by their primary keys.
     *
     * @param  array<int, int|string>  $ids
     *
     * @throws RepositoryException
     */
    public function forceDeleteMany(array $ids): int
    {
        $this->ensureSoftDeletes();

        if ($ids === []) {
            return 0;
        }

        try {
            /** @var Builder|SoftDeletes $query */
            $query = $this->query();

            return (int) $query->withTrashed()->whereKey($ids)->forceDelete();
        } catch (Throwable $e) {
            throw new RepositoryException("ForceDeleteMany failed: {$this->model()}", 0, $e);
        }
    }
}
