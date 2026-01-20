<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;

final class SortFilter implements FilterContract
{
    public function apply(Builder $query, array $filters): Builder
    {
        if (empty($filters['sort'])) {
            return $query;
        }

        $sort = $filters['sort'];
        $direction = str_starts_with($sort, '-') ? 'desc' : 'asc';
        $column = ltrim($sort, '-');

        return $query->orderBy($column, $direction);
    }
}
