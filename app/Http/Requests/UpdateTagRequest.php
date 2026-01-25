<?php

namespace App\Http\Requests\Tag;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTagRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Get the tag ID from the route parameter
        $tag = $this->route('tag');
        $id = $tag instanceof Model ? $tag->getKey() : $tag;

        return [
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:tags,slug,'.$id,
        ];
    }
}
