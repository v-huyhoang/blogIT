<?php

namespace App\Http\Requests\Post;

use App\DTOs\Post\PostFilterDTO;
use App\Enums\PostStatus;
use Illuminate\Foundation\Http\FormRequest;

class PostIndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'q' => ['nullable', 'string', 'max:255'],
            'sort' => ['nullable', 'in:published_at,created_at,view_count,status,title,published_at'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'status' => ['nullable', PostStatus::class],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'direction' => ['nullable', 'string', 'max:255', 'in:asc,desc'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'tag_id' => ['nullable', 'integer', 'exists:tags,id'],
            'trashed' => ['nullable', 'in:only,with'],
        ];
    }

    public function toFilter(): PostFilterDTO
    {
        $data = $this->validated();

        return PostFilterDTO::fromArray($data);
    }
}
