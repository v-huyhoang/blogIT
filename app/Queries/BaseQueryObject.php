<?php

namespace App\Queries;

abstract class BaseQueryObject
{
    /**
     * QueryObject:
     * - READ ONLY
     * - NO mutation
     * - NO transaction
     * - NO event
     */
    final protected function forbidMutation(): void
    {
        throw new \LogicException(
            static::class.' is a read-only query object.'
        );
    }
}
