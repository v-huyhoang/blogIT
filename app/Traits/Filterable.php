<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
	/**
	 * Scope for searching across multiple fields.
	 *
	 * @param Builder $query
	 * @param string|null $searchQuery
	 * @param array $searchableFields
	 * @return Builder
	 */
	public function scopeSearch(Builder $query, ?string $searchQuery): Builder
	{
		if (!$searchQuery || empty($this->searchable ?? [])) {
			return $query;
		}

		$searchQuery = trim($searchQuery);

		return $query->where(function (Builder $q) use ($searchQuery) {
			foreach ($this->searchable as $field) {
				$q->orWhere($field, 'LIKE', "%{$searchQuery}%");
			}
		});
	}

	/**
	 * Scope for filtering based on an associative array of column-value pairs.
	 *
	 * @param Builder $query
	 * @param array $filters
	 * @return Builder
	 */
	public function scopeFilter(Builder $query, array $filters): Builder
	{
		foreach ($filters as $key => $value) {
			if ($value === null || $value === '') {
				continue;
			}

			// relation filter: user.profile.status
			if (str_contains($key, '.')) {
				[$relation, $column] = explode('.', $key, 2);

				$query->whereHas($relation, function ($q) use ($column, $value) {
					$q->where($column, $value);
				});
				continue;
			}

			// operator support
			if (is_array($value)) {
				$query->where($key, $value['operator'] ?? '=', $value['value']);
			} else {
				$query->where($key, $value);
			}
		}

		return $query;
	}
}
