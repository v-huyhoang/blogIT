<?php

declare(strict_types=1);

namespace App\Repositories\Decorators;

use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Exceptions\RepositoryException;

/**
 * @property TagRepositoryInterface $inner
 */
final class EventfulTagRepository extends EventfulRepository implements TagRepositoryInterface
{
    /**
     * @param  TagRepositoryInterface  $inner  The inner repository (enforced by type hint and check).
     */
    public function __construct(
        BaseRepositoryInterface $inner,
        string $namespace
    ) {
        if (! $inner instanceof TagRepositoryInterface) {
            throw new RepositoryException('Inner repository must implement TagRepositoryInterface');
        }

        parent::__construct($inner, $namespace);
    }
}
