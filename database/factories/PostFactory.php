<?php

namespace Database\Factories;

use App\Enums\PostStatus;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(PostStatus::cases());

        $publishAt = null;
        $publishedAt = null;

        if ($status === PostStatus::Schedule) {
            // Schedule for the future (e.g., between 1 hour and 30 days from now)
            $publishAt = now()->addMinutes(rand(60, 43200));
        } elseif ($status === PostStatus::Published) {
            // Published in the past (e.g., between 1 hour and 60 days ago)
            $publishedAt = now()->subMinutes(rand(60, 86400));
        }

        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => $this->faker->sentence,
            'slug' => $this->faker->slug,
            'excerpt' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'status' => $status->value,
            'is_featured' => $this->faker->boolean,
            'comments_count' => rand(0, 1000),
            'views_count' => rand(0, 1000),
            'likes_count' => rand(0, 1000),
            'publish_at' => $publishAt,
            'published_at' => $publishedAt,
        ];
    }
}
