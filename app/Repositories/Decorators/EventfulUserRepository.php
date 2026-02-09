<?php

declare(strict_types=1);

namespace App\Repositories\Decorators;

use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Collection;

/**
 * @property UserRepositoryInterface $inner
 */
final class EventfulUserRepository extends EventfulRepository implements UserRepositoryInterface
{
    /**
     * @param  UserRepositoryInterface  $inner  The inner repository (enforced by type hint and check).
     */
    public function __construct(
        BaseRepositoryInterface $inner,
        string $namespace
    ) {
        if (! $inner instanceof UserRepositoryInterface) {
            throw new RepositoryException('Inner repository must implement UserRepositoryInterface');
        }

        parent::__construct($inner, $namespace);
    }

    public function getTopAuthors(int $limit = 4): Collection
    {
        return $this->inner->getTopAuthors($limit);
    }
}
