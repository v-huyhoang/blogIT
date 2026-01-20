<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;

final class SearchFilter implements FilterContract
{
    public function apply(Builder $query, array $filters): Builder
    {
        if (! empty($filters['q']) && method_exists($query->getModel(), 'scopeSearch')) {
            $query->search($filters['q']);
        }

        return $query;
    }
}
