<?php

namespace App\Http\Requests\HandlePdf;

use Illuminate\Foundation\Http\FormRequest;

class CreateHandlePdfRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'title' => 'required|string|max:255',
			'type_pdf' => 'required|integer',
			// 'description' => 'required|string',
			'file_path' => 'required|file|mimes:pdf,cbz,cbr,jpg,jpeg,png,webp|max:20480'
		];
	}
}