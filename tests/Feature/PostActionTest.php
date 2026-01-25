<?php

namespace Tests\Feature;

use App\Actions\Post\DuplicatePostAction;
use App\Actions\Post\PublishPostAction;
use App\Actions\Post\UnpublishPostAction;
use App\Enums\PostStatus;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostActionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Create dependencies
        User::factory()->create();
        Category::factory()->create();
    }

    public function test_duplicate_post_action()
    {
        $tag = Tag::factory()->create();
        $post = Post::factory()->create([
            'title' => 'Original Post',
            'status' => PostStatus::Published,
        ]);
        $post->tags()->attach($tag);

        $action = app(DuplicatePostAction::class);
        $newPost = $action->handle($post);

        $this->assertNotEquals($post->id, $newPost->id);
        $this->assertEquals($post->title.' (Copy)', $newPost->title);
        $this->assertStringContainsString('-copy-', $newPost->slug);
        $this->assertEquals(PostStatus::Draft, $newPost->status);
        $this->assertNull($newPost->published_at);
        $this->assertEquals(1, $newPost->tags()->count());
        $this->assertEquals($tag->id, $newPost->tags()->first()->id);
    }

    public function test_publish_post_action()
    {
        $post = Post::factory()->create([
            'status' => PostStatus::Draft,
            'published_at' => null,
        ]);

        $action = app(PublishPostAction::class);
        $updatedPost = $action->handle($post);

        $this->assertEquals(PostStatus::Published, $updatedPost->status);
        $this->assertNotNull($updatedPost->published_at);
    }

    public function test_unpublish_post_action()
    {
        $post = Post::factory()->create([
            'status' => PostStatus::Published,
            'published_at' => now(),
        ]);

        $action = app(UnpublishPostAction::class);
        $updatedPost = $action->handle($post);

        $this->assertEquals(PostStatus::Draft, $updatedPost->status);
        $this->assertNull($updatedPost->published_at);
    }
}
