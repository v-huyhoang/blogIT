<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HasSlugTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_generates_a_slug_on_creation(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $post = Post::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'My First Post',
            'content' => 'Content here',
        ]);

        $this->assertEquals('my-first-post', $post->slug);
    }

    public function test_it_generates_a_unique_slug(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        Post::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Duplicate Title',
            'content' => 'Content here',
        ]);

        $post2 = Post::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Duplicate Title',
            'content' => 'Content here',
        ]);

        $this->assertEquals('duplicate-title-1', $post2->slug);

        $post3 = Post::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Duplicate Title',
            'content' => 'Content here',
        ]);

        $this->assertEquals('duplicate-title-2', $post3->slug);
    }

    public function test_it_updates_slug_when_source_is_dirty(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $post = Post::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Original Title',
            'content' => 'Content here',
        ]);

        $this->assertEquals('original-title', $post->slug);

        $post->update(['title' => 'Updated Title']);

        $this->assertEquals('updated-title', $post->slug);
    }

    public function test_it_does_not_update_slug_if_manually_set(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $post = Post::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Some Title',
            'slug' => 'custom-slug',
            'content' => 'Content here',
        ]);

        $this->assertEquals('custom-slug', $post->slug);

        $post->update(['title' => 'New Title', 'slug' => 'another-custom-slug']);
        $this->assertEquals('another-custom-slug', $post->slug);
    }

    public function test_it_handles_soft_deleted_slugs_if_configured(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $post1 = Post::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Soft Deleted Title',
            'content' => 'Content here',
        ]);

        $post1->delete(); // Soft delete

        $post2 = Post::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Soft Deleted Title',
            'content' => 'Content here',
        ]);

        // Default behavior in Post.php is $slugUniqueAcrossSoftDeleted = true
        $this->assertEquals('soft-deleted-title-1', $post2->slug);
    }
}
