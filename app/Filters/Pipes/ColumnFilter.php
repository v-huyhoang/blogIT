<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

final class ColumnFilter implements FilterContract
{
    /**
     * Keys that should be ignored by the ColumnFilter as they are handled by other pipes
     * or are metadata.
     */
    protected array $reserved = [
        'q',
        'sort',
        'direction',
        'trashed',
        'page',
        'per_page',
        'limit',
        'offset',
    ];

    /**
     * Apply the column filter to the given query.
     */
    public function apply(Builder $query, array $filterValues): Builder
    {
        // Get the reserved keys and filter out any keys that are not reserved
        $reservedKeys = array_flip($this->reserved);
        $filterValues = array_diff_key($filterValues, $reservedKeys);

        // Get the comparison suffixes and filter out any keys that end with them
        $comparisonSuffixes = ['_from', '_to', '_gt', '_gte', '_lt', '_lte'];
        $filterValues = array_filter(
            $filterValues,
            function ($value, $key) use ($comparisonSuffixes) {
                return ! Str::endsWith($key, $comparisonSuffixes);
            },
            ARRAY_FILTER_USE_BOTH
        );

        // If the query model has a scopeFilter method, call it with the filter values
        if (method_exists($query->getModel(), 'scopeFilter')) {
            $query->filter($filterValues);
        }

        return $query;
    }
}
