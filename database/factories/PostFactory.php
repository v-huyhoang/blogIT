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
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => $this->faker->sentence,
            'slug' => $this->faker->slug,
            'excerpt' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            // random in PostStatus enums
            'status' => $status = $this->faker->randomElement(PostStatus::cases())->value,
            'is_featured' => $this->faker->boolean,
            'comments_count' => rand(0, 1000),
            'views_count' => rand(0, 1000),
            'likes_count' => rand(0, 1000),
            'published_at' => $status === PostStatus::Published->value ? now()->subDays(rand(0, 60))->toDateString() : null,
        ];
    }
}
