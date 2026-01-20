<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;

final class ColumnFilter implements FilterContract
{
    public function apply(Builder $query, array $filters): Builder
    {
        unset(
            $filters['q'],
            $filters['trashed'],
            $filters['sort'],
            $filters['created_at_from'],
            $filters['created_at_to'],
            $filters['published_at_from'],
            $filters['published_at_to']
        );

        if (method_exists($query->getModel(), 'scopeFilter')) {
            $query->filter($filters);
        }

        return $query;
    }
}
