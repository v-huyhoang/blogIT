<?php

namespace App\Http\Controllers;

use App\DTOs\Tag\CreateTagDTO;
use App\DTOs\Tag\TagFilterDTO;
use App\DTOs\Tag\UpdateTagDTO;
use App\Http\Requests\Tag\StoreTagRequest;
use App\Http\Requests\Tag\UpdateTagRequest;
use App\Services\TagService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    protected $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    public function index(Request $request)
    {
        $filterDTO = TagFilterDTO::fromRequest($request->all());

        $tags = $this->tagService->getAll($filterDTO);

        return Inertia::render('tags/index', [
            'tags' => $tags,
        ]);
    }

    public function store(StoreTagRequest $request)
    {
        $dto = CreateTagDTO::fromRequest($request->validated());
        $this->tagService->store($dto);

        return to_route('tags.index')->with('message', 'Tag created successfully.');
    }

    public function update(UpdateTagRequest $request, int $id)
    {
        try {
            $dto = UpdateTagDTO::fromRequest($request->validated());
            $this->tagService->update($id, $dto);
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => 'Cannot update tag.']);
        }

        return to_route('tags.index')->with('message', 'Tag updated successfully.');
    }

    public function destroy(int $id)
    {
        try {
            $this->tagService->delete($id);

            return to_route('tags.index')->with('message', 'Tag deleted successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Cannot delete tag.']);
        }
    }
}
