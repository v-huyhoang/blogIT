<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_posts_index_page_renders_with_correct_props()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $tag = Tag::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);
        $post->tags()->attach($tag);

        $response = $this->actingAs($user)->get(route('admin.posts.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/posts/index')
            ->has('posts')
            ->has('filters')
            ->missing('tags')
            ->missing('categories')
            ->missing('users')
        );
    }

    public function test_admin_posts_can_filter_by_published_date()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        // Post published 2 days ago
        $postOld = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'published_at' => now()->subDays(2),
        ]);

        // Post published today
        $postNew = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'published_at' => now(),
        ]);

        // Filter for the old post specifically
        $response = $this->actingAs($user)->get(route('admin.posts.index', [
            'published_at_from' => now()->subDays(3)->toDateString(),
            'published_at_to' => now()->subDays(1)->toDateString(),
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/posts/index')
            ->has('posts.data', 1)
            ->where('posts.data.0.id', $postOld->id)
        );
    }

    public function test_admin_posts_can_filter_by_views_count_range()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        // Post with 10 views
        $postLow = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'views_count' => 10,
        ]);

        // Post with 100 views
        $postHigh = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'views_count' => 100,
        ]);

        // Filter for posts with at least 50 views
        $response = $this->actingAs($user)->get(route('admin.posts.index', [
            'views_count_from' => 50,
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/posts/index')
            ->has('posts.data', 1)
            ->where('posts.data.0.id', $postHigh->id)
        );
    }

    public function test_admin_posts_can_filter_using_gt_suffix()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'views_count' => 50,
        ]);

        $postMore = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'views_count' => 51,
        ]);

        // Filter for views > 50 (should only return the post with 51)
        $response = $this->actingAs($user)->get(route('admin.posts.index', [
            'views_count_gt' => 50,
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/posts/index')
            ->has('posts.data', 1)
            ->where('posts.data.0.id', $postMore->id)
        );
    }

    public function test_admin_posts_can_filter_using_lt_suffix()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $postLess = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'comments_count' => 5,
        ]);

        Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'comments_count' => 10,
        ]);

        // Filter for comments < 10 (should only return the post with 5)
        $response = $this->actingAs($user)->get(route('admin.posts.index', [
            'comments_count_lt' => 10,
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/posts/index')
            ->has('posts.data', 1)
            ->where('posts.data.0.id', $postLess->id)
        );
    }
}
