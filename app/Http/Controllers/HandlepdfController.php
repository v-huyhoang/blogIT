<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\HandlePdf\CreateHandlePdfRequest;
use Inertia\Inertia;
use App\Services\HandlepdfService;
use App\DTOs\HandlePdf\CreateHandlePdfDTO;
use Illuminate\Http\RedirectResponse;

class HandlepdfController extends Controller
{
	protected $handlepdfService;
	public function __construct(HandlepdfService $handlepdfService){
		$this->handlepdfService = $handlepdfService;
	}
	public function index(){
		$handlepdfs = $this->handlepdfService->getAll();
		return Inertia::render('handlepdfs/index', ['handlepdfs' => $handlepdfs]);
	}

	public function create(){
		return Inertia::render('handlepdfs/create-handle-pdf', []);
	}

	public function store(CreateHandlePdfRequest $request): RedirectResponse
	{
		try {
			$file = $request->file('file_path');
			$dto = CreateHandlePdfDTO::fromRequest($request->validated());
			$this->handlepdfService->create($dto, $file);
		} catch (\Exception $e) {
			return redirect()->back()->withErrors(['error' => $e->getMessage()]);
		}

		return to_route('handlepdfs.index')->with('message', 'HandlePdf created successfully');
	}
}
