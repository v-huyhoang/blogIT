<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\Eloquent\HandlepdfRepository;

class Handlepdf extends Model
{
	protected $table = 'handle_pdfs';
	protected $fillable = [
		'user_id',
		'category_pdf_id',
		'title',
		'type_pdf',
		'description',
		'file_path',
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
