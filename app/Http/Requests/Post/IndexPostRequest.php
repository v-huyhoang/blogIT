<?php

namespace App\Http\Requests\Post;

use App\Constants\Pagination;
use App\DTOs\Post\PaginationDTO;
use App\DTOs\Post\PostFilterDTO;
use App\DTOs\Post\SortDTO;
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
            'sort' => ['nullable', 'in:id,published_at,created_at,views_count,comments_count,likes_count,status,title'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'status' => ['nullable', Rule::enum(PostStatus::class)],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'direction' => ['nullable', 'string', 'max:255', 'in:asc,desc'],
            'per_page' => ['nullable', 'integer', Rule::in(Pagination::OPTIONS)],
            'tag_id' => ['nullable', 'integer', 'exists:tags,id'],
            'trashed' => ['nullable',  Rule::enum(TrashedFilter::class)],
            'page' => ['nullable', 'integer', 'min:1'],
            'published_at_from' => ['nullable', 'date'],
            'published_at_to' => ['nullable', 'date', 'after_or_equal:published_at_from'],
        ];
    }

    public function toFilter(): PostFilterDTO
    {
        $data = $this->validated();

        return PostFilterDTO::fromArray([
            'q' => $data['q'] ?? null,
            'category_id' => $data['category_id'] ?? null,
            'status' => $data['status'] ?? null,
            'user_id' => $data['user_id'] ?? null,
            'tag_id' => $data['tag_id'] ?? null,
            'trashed' => $data['trashed'] ?? null,
            'published_at_from' => $data['published_at_from'] ?? null,
            'published_at_to' => $data['published_at_to'] ?? null,
            'sort' => $data['sort'] ?? null,
            'direction' => $data['direction'] ?? null,
            'per_page' => $data['per_page'] ?? null,
        ]);
    }

    public function toSort(): SortDTO
    {
        $data = $this->validated();

        return SortDTO::fromArray([
            'field' => $data['sort'] ?? 'created_at',
            'direction' => $data['direction'] ?? 'desc',
        ]);
    }

    public function toPagination(): PaginationDTO
    {
        $data = $this->validated();

        return PaginationDTO::fromArray([
            'perPage' => $data['per_page'] ?? Pagination::DEFAULT_PER_PAGE,
            'page' => $data['page'] ?? 1,
        ]);
    }
}
