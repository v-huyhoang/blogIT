<?php

namespace App\Filters\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface FilterContract
{
    public function apply(Builder $query, array $filters): Builder;
}
