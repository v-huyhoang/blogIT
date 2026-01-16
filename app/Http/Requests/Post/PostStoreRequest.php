<?php

namespace App\Http\Requests\Post;

use App\DTOs\Post\PostDTO;
use App\Enums\PostStatus;
use App\Rules\ValidPublishedAt;
use Illuminate\Foundation\Http\FormRequest;

class PostStoreRequest extends FormRequest
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
            'user_id' => ['integer', 'exists:users,id'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'status' => ['required', PostStatus::class],
            'published_at' => [new ValidPublishedAt($this->input('status'))],
            'tag_ids' => ['array'],
            'tag_ids.*' => ['integer', 'exists:tags,id'],
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => $this->user()?->id,
        ]);
    }

    public function toDto(): PostDTO
    {
        $data = $this->validated();

        $data['published_at'] = ! empty($data['published_at']) ? $data['published_at']->toDateTimeString() : null;

        return PostDTO::fromArray($data);
    }
}
