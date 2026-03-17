<?php

namespace App\Services;
use App\Repositories\Eloquent\HandlepdfRepository;
use Illuminate\Support\Facades\Auth;

class HandlepdfService
{
	protected $handlepdfRepository;
	public function __construct( HandlepdfRepository $handlepdfRepository )
	{
		$this->handlepdfRepository = $handlepdfRepository;
	}

	/**
	 * Get all category with params
	 *
	 * @param  bool  $onlyRoot
	 */
	public function getAll($onlyRoot = false)
	{
		return $this->handlepdfRepository->getAll($onlyRoot);
	}

	/**
	 * Create data
	 */
	public function create($data, $file): void
	{
		$file_path = $file->storeAs('handlepdfs', time().'_'.$file->getClientOriginalName());
		$this->handlepdfRepository->create([
			'user_id' => Auth::id(),
			'category_pdf_id' => $data->category_pdf_id ?? 1,
			'title' => $data->title,
			'type_pdf' => $data->type_pdf,
			'description' => $data->description ?? '',
			'file_path' => $file_path
		]);
	}

	/**
	 * Update an existing category
	 */
	public function update(): void
	{
	}

	/**
	 * Delete an existing category
	 */
	public function delete(int $id): void
	{
	}
}
