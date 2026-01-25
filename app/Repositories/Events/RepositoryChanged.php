<?php

namespace App\Repositories\Events;

/**
 * Class RepositoryChanged
 *
 * Event dispatched whenever a repository data mutation occurs.
 */
final class RepositoryChanged
{
    /**
     * @param  string  $namespace  The repository namespace that was modified.
     */
    public function __construct(public readonly string $namespace) {}
}
