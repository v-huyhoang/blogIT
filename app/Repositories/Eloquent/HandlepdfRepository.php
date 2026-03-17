<?php

namespace App\Repositories\Eloquent;

use App\Models\Handlepdf;
use App\Repositories\Contracts\HandlePdfRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class HandlepdfRepository extends BaseRepository implements HandlePdfRepositoryInterface
{
	/**
	 * Get the model class name.
	 */
	public function model(): string
	{
		return Handlepdf::class;
	}

	/**
	 * Get all category by params
	 */
	public function getAll($onlyRoot = false): LengthAwarePaginator
	{
		return $this->model
		->with('user')
		->orderBy('id', 'desc')
		->paginate(10);
	}
}
