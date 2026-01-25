<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

trait Filterable
{
    /**
     * Scope for searching across multiple fields.
     *
     * @param  array  $searchableFields
     */
    public function scopeSearch(Builder $query, ?string $searchQuery): Builder
    {
        if (! $searchQuery || empty($this->searchable ?? [])) {
            return $query;
        }

        $searchQuery = trim($searchQuery);

        return $query->where(function (Builder $q) use ($searchQuery) {
            foreach ($this->searchable as $field) {
                // Support relational search: category.name
                if (str_contains($field, '.')) {
                    [$relation, $column] = explode('.', $field, 2);
                    $q->orWhereHas($relation, function ($q) use ($column, $searchQuery) {
                        $q->where($column, 'LIKE', "%{$searchQuery}%");
                    });
                } else {
                    $q->orWhere($field, 'LIKE', "%{$searchQuery}%");
                }
            }
        });
    }

    /**
     * Scope for filtering based on an associative array of column-value pairs.
     */
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        $filterable = $this->getFilterableAttributes();

        foreach ($filters as $key => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            // 1. Custom Filter Method: filterStatus($query, $value)
            $method = 'filter'.Str::studly($key);
            if (method_exists($this, $method)) {
                $this->{$method}($query, $value);

                continue;
            }

            // 2. Relational Filter: user.name = 'John'
            if (str_contains($key, '.')) {
                $relation = substr($key, 0, strrpos($key, '.'));
                $column = substr($key, strrpos($key, '.') + 1);

                // Ideally, we should check if relation is allowed, but for now we assume 'user.id' style is safe enough
                // if we trust the input keys. To be stricter, one could define $allowedRelations.
                $query->whereHas($relation, function ($q) use ($column, $value) {
                    if (is_array($value)) {
                        if (isset($value['value'])) {
                            $q->where(
                                $column,
                                $value['operator'] ?? '=',
                                $value['value']
                            );
                        } else {
                            $q->whereIn($column, $value);
                        }
                    } else {
                        $q->where($column, $value);
                    }
                });

                continue;
            }

            // 3. Standard Column Filter
            // Check if column is allowed to be filtered
            if (! in_array($key, $filterable)) {
                continue;
            }

            // Operator support (legacy or specific use case)
            if (is_array($value) && isset($value['operator'], $value['value'])) {
                $query->where($key, $value['operator'], $value['value']);

                continue;
            }

            // Array value -> whereIn
            if (is_array($value)) {
                $query->whereIn($key, $value);

                continue;
            }

            // Default -> Exact match
            $query->where($key, $value);
        }

        return $query;
    }

    /**
     * Get the attributes that can be filtered.
     * Defaults to fillable + primary key + timestamps.
     * Can be overridden by defining protected $allowedFilters on the model.
     */
    public function getFilterableAttributes(): array
    {
        if (property_exists($this, 'allowedFilters')) {
            return $this->allowedFilters;
        }

        return array_merge(
            $this->getFillable(),
            [$this->getKeyName(), 'created_at', 'updated_at', 'id']
        );
    }
}
