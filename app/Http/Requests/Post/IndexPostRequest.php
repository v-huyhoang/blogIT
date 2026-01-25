<?php

namespace App\Http\Requests\Post;

use App\Constants\Pagination;
use App\DTOs\Post\PostQueryDTO;
use App\Enums\PostStatus;
use App\Enums\TrashedFilter;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
            'sort' => ['nullable', Rule::in(['id', 'published_at', 'created_at', 'views_count', 'comments_count', 'likes_count', 'status', 'title'])],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'status' => ['nullable', Rule::enum(PostStatus::class)],
            'is_featured' => ['nullable', 'boolean'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'direction' => ['nullable', 'string', 'max:255', 'in:asc,desc'],
            'per_page' => ['nullable', 'integer', Rule::in(Pagination::OPTIONS)],
            'tag_id' => ['nullable', 'integer', 'exists:tags,id'],
            'trashed' => ['nullable',  Rule::enum(TrashedFilter::class)],
            'page' => ['nullable', 'integer', 'min:1'],
            'published_at_from' => ['nullable', 'date'],
            'published_at_to' => ['nullable', 'date', 'after_or_equal:published_at_from'],
            'views_count_from' => ['nullable', 'integer', 'min:0'],
            'views_count_to' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function toQueryDTO(): PostQueryDTO
    {
        return PostQueryDTO::fromRequest($this->all());
    }
}
