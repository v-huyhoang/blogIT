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
        $model = $query->getModel();

        if (! in_array(SoftDeletes::class, class_uses_recursive($model))) {
            return $query;
        }

        $trashedFilter = $filters['trashed'] ?? null;

        return match ($trashedFilter) {
            TrashedConst::With->value => $query->withTrashed(),
            TrashedConst::Only->value => $query->onlyTrashed(),
            default => $query,
        };
    }
}
