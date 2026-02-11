<?php

namespace App\Services;

use App\DTOs\Permission\PermissionFilterDTO;
use App\Repositories\Contracts\PermissionRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PermissionService
{
    protected $permissionRepository;

    /**
     * Inject Permission repository
     *
     * @param PermissionRepositoryInterface
     */
    public function __construct(PermissionRepositoryInterface $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Get all permission with params
     */
    public function getAll(PermissionFilterDTO $dto): LengthAwarePaginator
    {
        return $this->permissionRepository->paginate(filters: $dto->filters);
    }

    /**
     * Store a new permission
     */
    public function store(array $request): void
    {
        $this->permissionRepository->create($request);
    }

    /**
     * Update an existing permission
     */
    public function update(int $id, array $request): void
    {
        $this->permissionRepository->update($id, $request);
    }

    /**
     * Delete an existing permission
     */
    public function delete(int $id): void
    {
        $this->permissionRepository->delete($id);
    }
}
