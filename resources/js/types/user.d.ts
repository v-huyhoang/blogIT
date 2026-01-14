import { Pagination } from "./pagination";

export interface SingleUser {
	id: number;
	name: string;
	email: string;
	roles: string[];
	created_at: string;
	updated_at: string;
}

export interface User extends Pagination {
	data: SingleUser[];
}

export interface UserRole extends SingleUser {
	roles: SingleRole[];
}
