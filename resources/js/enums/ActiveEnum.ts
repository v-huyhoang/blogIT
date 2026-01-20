export enum ActiveStatus {
	INACTIVE = 0,
	ACTIVE = 1,
}

export const statusMap = {
	[ActiveStatus.ACTIVE]: {
		label: 'Active',
		variant: 'default' as const,
		className: 'bg-green-500 hover:bg-green-600',
	},
	[ActiveStatus.INACTIVE]: {
		label: 'Inactive',
		variant: 'destructive' as const,
		className: '',
	},
};
