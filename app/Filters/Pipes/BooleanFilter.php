<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;

final class BooleanFilter implements FilterContract
{
    /**
     * Apply the boolean filter to the given query.
     * It checks if the filter key exists in the model's casts as a boolean
     * and applies the correctly casted value.
     */
    public function apply(Builder $query, array $filterValues): Builder
    {
        $model = $query->getModel();
        $casts = $model->getCasts();

        foreach ($filterValues as $key => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            // Check if the column is cast as boolean
            if (isset($casts[$key]) && ($casts[$key] === 'boolean' || $casts[$key] === 'bool')) {
                $query->where($key, filter_var($value, FILTER_VALIDATE_BOOLEAN));
            }
        }

        return $query;
    }
}
