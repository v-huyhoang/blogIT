<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->roles?->first()?->name ?? 'Author',
            'posts_count' => $this->posts_count ?? 0,
            'followers_count' => $this->followers_count ?? 0,
            'avatar' => $this->avatar ?? 'https://i.pravatar.cc/150?u='.$this->id,
        ];
    }
}
