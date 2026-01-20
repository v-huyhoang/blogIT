<?php

namespace App\Filters\Pipes;

use App\Enums\TrashedFilter as TrashedConst;
use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

final class TrashedFilter implements FilterContract
{
    public function apply(Builder $query, array $filters): Builder
    {
        if (! in_array(SoftDeletes::class, class_uses_recursive($query->getModel()))) {
            return $query;
        }

        return match ($filters['trashed'] ?? null) {
            TrashedConst::With->value => $query->withTrashed(),
            TrashedConst::Only->value => $query->onlyTrashed(),
            default => $query,
        };
    }
}
