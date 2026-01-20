<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

final class FilterPipeline
{
    /** @var array<class-string> */
    protected array $pipes = [];

    public function __construct(array $pipes)
    {
        $this->pipes = $pipes;
    }

    public function apply(Builder $query, array $filters): Builder
    {
        foreach ($this->pipes as $pipe) {
            $query = app($pipe)->apply($query, $filters);
        }

        return $query;
    }
}
