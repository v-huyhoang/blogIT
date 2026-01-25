<?php

namespace App\Repositories\Listeners;

use App\Repositories\Cache\RepositoryCacheInvalidator;
use App\Repositories\Events\RepositoryChanged;

/**
 * Class InvalidateRepositoryCache
 *
 * Listener that handles automatic cache clearing when data changes.
 */
final class InvalidateRepositoryCache
{
    public function __construct(private readonly RepositoryCacheInvalidator $invalidator) {}

    /**
     * Handle the change event.
     */
    public function handle(RepositoryChanged $event): void
    {
        $this->invalidator->invalidate($event->namespace);
    }
}
