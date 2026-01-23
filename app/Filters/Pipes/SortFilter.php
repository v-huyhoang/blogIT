<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;

final class SortFilter implements FilterContract
{
    public function apply(Builder $query, array $filters): Builder
    {
        $sort = $filters['sort'] ?? null;

        if ($sort === null) {
            return $query;
        }

        $direction = $this->getDirectionFromSort($sort);
        $column = $this->getColumnFromSort($sort);

        return $query->orderBy($column, $direction);
    }

    private function getDirectionFromSort(string $sort): string
    {
        return substr($sort, 0, 1) === '-' ? 'desc' : 'asc';
    }

    private function getColumnFromSort(string $sort): string
    {
        return ltrim($sort, '-+');
    }
}
