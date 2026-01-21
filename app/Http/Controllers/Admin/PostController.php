<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\IndexPostRequest;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Queries\Post\PostListQuery;
use App\Services\PostService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function __construct(private PostService $postService, private PostListQuery $postListQuery) {}

    /**
     * Display a listing of the resource.
     */
    public function index(IndexPostRequest $request): Response
    {
        $filters = $request->toFilter();
        $pagination = $request->toPagination();
        $sort = $request->toSort();

        $posts = $this->postListQuery->execute($pagination, $sort, $filters, [
            'user:id,name',
            'category:id,name',
            'tags:id,name',
        ]);

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
            'filters' => $filters->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tags = Tag::all(['id', 'name']);
        $categories = Category::all(['id', 'name']);

        return Inertia::render('admin/posts/create', [
            'tags' => $tags,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $this->postService->createPost($data);

        return to_route('admin.posts.index')->with('message', 'Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load('user', 'tags');

        return Inertia::render('admin/posts/show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): Response
    {
        $post->load('category', 'tags');
        $tags = Tag::all(['id', 'name']);
        $categories = Category::all(['id', 'name']);

        return Inertia::render('admin/posts/edit', [
            'post' => $post,
            'tags' => $tags,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $data = $request->validated();

        $this->postService->updatePost($post, $data);

        return to_route('admin.posts.index')->with('message', 'Post updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $this->postService->deletePost($post);

        return to_route('admin.posts.index')->with('message', 'Post deleted successfully');
    }
}
