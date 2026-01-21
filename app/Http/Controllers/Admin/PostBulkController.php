<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Post\BulkDeletePostsAction;
use App\Actions\Post\BulkForceDeletePostsAction;
use App\Actions\Post\BulkRestorePostsAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Post\BulkActionPostRequest;
use Illuminate\Http\RedirectResponse;

final class PostBulkController extends Controller
{
    public function __construct(
        private readonly BulkDeletePostsAction $bulkDelete,
        private readonly BulkRestorePostsAction $bulkRestore,
        private readonly BulkForceDeletePostsAction $bulkForceDelete,
    ) {}

    /**
     * Delete multiple posts by IDs.
     *
     *
     * @return RedirectResponse with a message indicating the number of deleted posts.
     */
    public function destroy(BulkActionPostRequest $request): RedirectResponse
    {
        $affected = $this->bulkDelete->handle($request->ids());

        return back()->with('message', "Deleted {$affected} posts.");
    }

    /**
     * Restore multiple soft-deleted posts by IDs.
     */
    public function restore(BulkActionPostRequest $request): RedirectResponse
    {
        $affected = $this->bulkRestore->handle($request->ids());

        return back()->with('message', "Restored {$affected} posts.");
    }

    /**
     * Permanently delete multiple posts by IDs.
     */
    public function forceDestroy(BulkActionPostRequest $request): RedirectResponse
    {
        $affected = $this->bulkForceDelete->handle($request->ids());

        return back()->with('message', "Permanently deleted {$affected} posts.");
    }
}
