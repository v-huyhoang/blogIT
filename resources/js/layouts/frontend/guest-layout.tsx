import ConfirmDialog from '@/components/dialogs/confirm-dialog';
import { BackToTop } from '@/components/frontend/back-to-top';
import { FooterMegaMenu } from '@/components/frontend/footer-mega-menu';
import { GuestNavbar } from '@/layouts/frontend/guest-navbar';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { Toaster, toast } from 'sonner';

interface GuestLayoutProps {
	children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
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
		<div className="flex min-h-screen flex-col bg-background font-sans antialiased transition-colors duration-500">
			<GuestNavbar />
			<main className="page-enter mx-auto w-full flex-grow">
				{children}
			</main>
			<FooterMegaMenu />
			<BackToTop />
			<ConfirmDialog />
			<Toaster position="top-right" richColors closeButton />
		</div>
	);
}
