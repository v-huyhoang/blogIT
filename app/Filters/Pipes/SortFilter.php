<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;

final class SortFilter implements FilterContract
{
    public function apply(Builder $query, array $filters): Builder
    {
        $sort = $filters['sort'] ?? null;

        if (! $sort) {
            return $query;
        }

        $direction = str_starts_with($sort, '-') ? 'desc' : 'asc';
        $column = ltrim($sort, '-');

        return $query->orderBy($column, $direction);
    }
}
