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
	const SUPER_ADMIN_ROLE = 'Super Admin';

	/**
	 * Check if user is super admin
	 */
	const isSuperAdmin = (): boolean => {
		return roles.includes(SUPER_ADMIN_ROLE);
	};

	/**
	 * Check if user has a specific permission
	 */
	const can = (permission: string): boolean => {
		if (isSuperAdmin()) return true;
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
		if (isSuperAdmin()) return true;
		return permissionsList.some((p) => permissions.includes(p));
	};

	/**
	 * Check if user has ALL of the given permissions
	 */
	const canAll = (permissionsList: string[]): boolean => {
		if (isSuperAdmin()) return true;
		return permissionsList.every((p) => permissions.includes(p));
	};

	return { can, hasRole, canAny, canAll, roles, permissions, isSuperAdmin };
}
