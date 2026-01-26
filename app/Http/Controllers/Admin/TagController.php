<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tag\IndexTagRequest;
use App\Http\Requests\Tag\StoreTagRequest;
use App\Http\Requests\Tag\UpdateTagRequest;
use App\Models\Tag;
use App\Services\TagService;
use Inertia\Inertia;

class TagController extends Controller
{
    public function __construct(private readonly TagService $tagService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(IndexTagRequest $request)
    {
        $filters = $request->validated();

        return Inertia::render('admin/tags/index', [
            'tags' => $this->tagService->getAll(['id', 'name', 'slug', 'created_at'], $filters),
            'filters' => $filters,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $this->tagService->createTag($request->validated());

        return back()->with('message', 'Tag created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $this->tagService->updateTag($tag, $request->validated());

        return back()->with('message', 'Tag updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $this->tagService->deleteTag($tag);

        return back()->with('message', 'Tag deleted successfully');
    }
}
