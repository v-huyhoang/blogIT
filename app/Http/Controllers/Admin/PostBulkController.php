<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Post\BulkDeletePostsAction;
use App\Actions\Post\BulkForceDeletePostsAction;
use App\Actions\Post\BulkRestorePostsAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Post\BulkDeletePostRequest;
use App\Http\Requests\Post\BulkForceDeletePostRequest;
use App\Http\Requests\Post\BulkRestorePostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;

final class PostBulkController extends Controller
{
    public function __construct(
        private readonly BulkDeletePostsAction $bulkDelete,
        private readonly BulkRestorePostsAction $bulkRestore,
        private readonly BulkForceDeletePostsAction $bulkForceDelete,
    ) {}

    public function destroy(BulkDeletePostRequest $request): RedirectResponse
    {
        // $this->authorize('deleteAny', Post::class);

        $affected = $this->bulkDelete->handle($request->ids());

        return back()->with('message', "Deleted {$affected} posts.");
    }

    public function restore(BulkRestorePostRequest $request): RedirectResponse
    {
        // $this->authorize('restoreAny', Post::class);

        $affected = $this->bulkRestore->handle($request->ids());

        return back()->with('message', "Restored {$affected} posts.");
    }

    public function forceDestroy(BulkForceDeletePostRequest $request): RedirectResponse
    {
        // $this->authorize('forceDeleteAny', Post::class);

        $affected = $this->bulkForceDelete->handle($request->ids());

        return back()->with('message', "Permanently deleted {$affected} posts.");
    }
}
