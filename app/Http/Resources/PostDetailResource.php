<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostDetailResource extends JsonResource
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
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'slug' => $this->slug,
            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name ?? 'Unknown',
                'avatar' => $this->user?->avatar,
            ],
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ],
            'tags' => $this->tags->map(fn ($tag) => [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
            ]),
            'likes_count' => $this->likes_count ?? 0,
            'views_count' => $this->views_count ?? 0,
            'comments_count' => $this->comments_count ?? 0,
            'published_at' => $this->published_at?->format('M d, Y'),
            'image' => $this->image,
            'image_url' => $this->image_url,
            'is_featured' => $this->is_featured,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'created_at' => $this->created_at?->format('M d, Y'),
        ];
    }
}
