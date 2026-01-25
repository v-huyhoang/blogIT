import { Input } from '@/components/ui/input';
import { ComponentProps } from 'react';
import { Auth } from './auth';

export interface BreadcrumbItem {
	title: string;
	href: string;
}

export interface SharedData {
	name: string;
	quote: { message: string; author: string };
	auth: Auth;
	sidebarOpen: boolean;
	flash: {
		message?: string;
		error?: string;
		success?: string;
		[key: string]: string | undefined;
	};
	[key: string]: unknown;
}

export type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type'> & {
	/** Custom class for the toggle button */
	buttonClassName?: string;

	/** aria-label when password is visible */
	showLabel?: string;

	/** aria-label when password is hidden */
	hideLabel?: string;

	/** Show password by default on mount */
	defaultShow?: boolean;

	/** Callback fired when visibility is toggled */
	onToggle?: (show: boolean) => void;

	/**
	 * Automatically hide password when condition becomes true
	 * Commonly used with form processing/submitting state
	 */
	autoHideWhen?: boolean;
};
