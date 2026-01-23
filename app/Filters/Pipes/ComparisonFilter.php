<?php

namespace App\Filters\Pipes;

use App\Filters\Contracts\FilterContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

final class ComparisonFilter implements FilterContract
{
    /**
     * Map of suffixes to database operators.
     */
    protected array $operators = [
        '_gt' => '>',
        '_gte' => '>=',
        '_lt' => '<',
        '_lte' => '<=',
        '_from' => '>=',
        '_to' => '<=',
    ];

    public function apply(Builder $query, array $filters): Builder
    {
        foreach ($filters as $key => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            foreach ($this->operators as $suffix => $operator) {
                if (Str::endsWith($key, $suffix)) {
                    $field = Str::replaceLast($suffix, '', $key);
                    $this->applyWhere($query, $field, $operator, $value);

                    continue 2; // Move to next filter key
                }
            }
        }

        return $query;
    }

    private function applyWhere(Builder $query, string $field, string $operator, mixed $value): void
    {
        if ($this->isDateAttribute($query->getModel(), $field)) {
            $query->whereDate($field, $operator, $value);
        } else {
            $query->where($field, $operator, $value);
        }
    }

    private function isDateAttribute(Model $model, string $attribute): bool
    {
        if (in_array($attribute, $model->getDates())) {
            return true;
        }

        $casts = $model->getCasts();
        if (! array_key_exists($attribute, $casts)) {
            return false;
        }

        $cast = $casts[$attribute];

        return Str::startsWith($cast, 'date') || Str::startsWith($cast, 'datetime');
    }
}
