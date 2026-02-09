<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;

final class SortFilter implements FilterContract
{
    /**
     * Apply the filter to the query.
     */
    public function apply(Builder $query, array $filters): Builder
    {
        $sort = $filters['sort'] ?? null;

        if ($sort === null) {
            return $query;
        }

        $column = $this->getColumnFromSort($sort);
        $direction = $filters['direction'] ?? $this->getDirectionFromSort($sort);

        return $query->orderBy($column, $direction);
    }

    /**
     * Get the direction from the sort.
     */
    private function getDirectionFromSort(string $sort): string
    {
        return substr($sort, 0, 1) === '-' ? 'asc' : 'desc';
    }

    /**
     * Get the column from the sort.
     */
    private function getColumnFromSort(string $sort): string
    {
        return ltrim($sort, '-+');
    }
}
