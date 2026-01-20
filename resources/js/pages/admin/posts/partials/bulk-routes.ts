import PostBulkController from '@/actions/App/Http/Controllers/Admin/PostBulkController';

export const bulkRoutes = {
	bulkDelete: PostBulkController.destroy,
	bulkForceDelete: PostBulkController.forceDestroy,
	bulkRestore: PostBulkController.restore,
};
