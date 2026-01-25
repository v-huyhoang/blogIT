import { PaginatedResponse } from './pagination';

export interface User {
	id: number;
	name: string;
	email: string;
	avatar?: string;
	email_verified_at: string | null;
	two_factor_enabled?: boolean;
	created_at: string;
	updated_at: string;
	[key: string]: unknown; // This allows for additional properties...
}

export interface SingleUser {
	id: number;
	name: string;
	email: string;
	avatar?: string;
	email_verified_at: string | null;
	two_factor_enabled?: boolean;
	created_at: string;
	updated_at: string;
	[key: string]: unknown;
}

export interface Auth {
	user: SingleUser;
	permissions?: string[];
	roles?: string[];
}

export interface UserRole extends SingleUser {
	roles: { id: number; name: string }[];
}

export type UserIndexResponse = PaginatedResponse<UserRole>;
