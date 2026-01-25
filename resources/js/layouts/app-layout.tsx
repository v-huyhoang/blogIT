import ConfirmDialog from '@/components/dialogs/confirm-dialog';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { Toaster, toast } from 'sonner';

interface AppLayoutProps {
	children: ReactNode;
	breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
	const { props: pageProps } = usePage<SharedData>();
	const { flash, errors } = pageProps;

	useEffect(() => {
		if (flash?.message) {
			toast.success(flash.message);
		}
		if (flash?.error) {
			toast.error(flash.error);
		}
		if (errors?.error) {
			toast.error(errors.error);
		}
	}, [flash, errors]);

	return (
		<AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
			{children}
			<ConfirmDialog />
			<Toaster position="top-right" richColors closeButton />
		</AppLayoutTemplate>
	);
};
