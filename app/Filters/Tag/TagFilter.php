<?php

namespace App\Filters\Tag;

use App\Filters\FilterContract;
use Closure;
use Illuminate\Database\Eloquent\Builder;

class TagFilter implements FilterContract
{
    public function __construct(protected ?string $keyword) {}

    public function handle(Builder $query, Closure $next): Builder
    {
        if (! $this->keyword) {
            return $next($query);
        }

        $query->where('name', 'like', '%'.$this->keyword.'%')
            ->orWhere('slug', 'like', '%'.$this->keyword.'%');

        return $next($query);
    }
}
