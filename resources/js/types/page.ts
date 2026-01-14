import type { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface PageProps extends InertiaPageProps {
	filters: {
		q?: string;
		status?: string;
	};
}
