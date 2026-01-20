<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;

final class DateRangeFilter implements FilterContract
{
    protected array $fields = [
        'created_at',
        'published_at',
    ];

    public function apply(Builder $query, array $filters): Builder
    {
        foreach ($this->fields as $field) {
            $fromKey = "{$field}_from";
            $toKey = "{$field}_to";

            if (! empty($filters[$fromKey])) {
                $query->whereDate($field, '>=', $filters[$fromKey]);
            }

            if (! empty($filters[$toKey])) {
                $query->whereDate($field, '<=', $filters[$toKey]);
            }
        }

        return $query;
    }
}
