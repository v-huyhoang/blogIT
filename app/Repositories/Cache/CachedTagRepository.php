<?php

declare(strict_types=1);

namespace App\Repositories\Cache;

use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Collection;

/**
 * @property TagRepositoryInterface $inner
 */
final class CachedTagRepository extends CachedRepository implements TagRepositoryInterface
{
    /**
     * @param  TagRepositoryInterface  $inner  The inner repository (enforced by type hint and check).
     */
    public function __construct(
        BaseRepositoryInterface $inner,
        RepositoryCache $cache,
        string $namespace
    ) {
        if (! $inner instanceof TagRepositoryInterface) {
            throw new RepositoryException('Inner repository must implement TagRepositoryInterface');
        }

        parent::__construct($inner, $cache, $namespace);
    }

    public function getActiveWithPosts(): Collection
    {
        return $this->remember(
            'getActiveWithPosts',
            [],
            fn (): Collection => $this->inner->getActiveWithPosts()
        );
    }
}
