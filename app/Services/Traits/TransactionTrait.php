<?php

declare(strict_types=1);

namespace App\Services\Traits;

use Closure;
use Illuminate\Support\Facades\DB;
use Throwable;

/**
 * Trait TransactionTrait
 */
trait TransactionTrait
{
    /**
     * Execute a Closure within a transaction.
     *
     * @template TReturn
     *
     * @param  Closure(): TReturn  $callback
     * @return TReturn
     *
     * @throws Throwable
     */
    public function transaction(Closure $callback, int $attempts = 3): mixed
    {
        return DB::transaction($callback, $attempts);
    }
}
