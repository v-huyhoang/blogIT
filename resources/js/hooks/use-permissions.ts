import { SingleUser } from '@/types/user';
import { usePage } from '@inertiajs/react';

type AuthProps = {
	auth?: {
		user: SingleUser;
		permissions: string[];
		roles: string[];
	};
};

export function usePermissions() {
	const { props } = usePage<AuthProps>();
	const permissions = props.auth?.permissions || [];
	const roles = props.auth?.roles || [];

	/**
	 * Check if user has a specific permission
	 */
	const can = (permission: string): boolean => {
		return permissions.includes(permission);
	};

	/**
	 * Check if user has a specific role
	 */
	const hasRole = (role: string): boolean => {
		return roles.includes(role);
	};

	/**
	 * Check if user has any of the given permissions
	 */
	const canAny = (permissionsList: string[]): boolean => {
		return permissionsList.some((p) => permissions.includes(p));
	};

	/**
	 * Check if user has ALL of the given permissions
	 */
	const canAll = (permissionsList: string[]): boolean => {
		return permissionsList.every((p) => permissions.includes(p));
	};

	return { can, hasRole, canAny, canAll, roles, permissions };
}
