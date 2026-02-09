import ConfirmDialog from '@/components/dialogs/confirm-dialog';
import { BackToTop } from '@/components/frontend/back-to-top';
import { FooterMegaMenu } from '@/components/frontend/footer-mega-menu';
import { GuestNavbar } from '@/layouts/frontend/guest-navbar';
import { UserSidebar } from '@/layouts/frontend/user-sidebar';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { Toaster, toast } from 'sonner';

interface UserLayoutProps {
	children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
	const { props: pageProps, url } = usePage<SharedData>();
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
		<div className="font-compact flex min-h-screen flex-col bg-background font-sans antialiased transition-colors duration-500">
			<GuestNavbar />
			<main className="flex-grow pt-24">
				<div className="container mx-auto px-6 py-12">
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
						<UserSidebar />

						<div className="lg:col-span-9">
							<AnimatePresence mode="wait">
								<motion.div
									key={url}
									initial={{
										opacity: 0,
										y: 10,
										filter: 'blur(4px)',
									}}
									animate={{
										opacity: 1,
										y: 0,
										filter: 'blur(0px)',
									}}
									exit={{
										opacity: 0,
										y: -10,
										filter: 'blur(4px)',
									}}
									transition={{
										duration: 0.4,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="w-full"
								>
									{children}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</main>
			<FooterMegaMenu />
			<BackToTop />
			<ConfirmDialog />
			<Toaster position="top-right" richColors closeButton />
		</div>
	);
}
