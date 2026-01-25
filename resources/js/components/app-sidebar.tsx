import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
	BookOpenText,
	ContainerIcon,
	FileText,
	Key,
	LayoutGrid,
	LockKeyholeIcon,
	Users2Icon,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
	{
		title: 'Dashboard',
		href: dashboard(),
		icon: LayoutGrid,
		permission: 'view_dashboard',
	},
	{
		title: 'Permissions',
		href: '/permissions',
		icon: Key,
		permission: 'view_permissions',
	},
	{
		title: 'Roles',
		href: '/roles',
		icon: LockKeyholeIcon,
		permission: 'view_roles',
	},
	{
		title: 'Users',
		href: '/users',
		icon: Users2Icon,
		permission: 'view_users',
	},
	{
		title: 'Blog',
		href: '#',
		icon: BookOpenText,
		permission: 'view_categories',
		items: [
			{
				title: 'Categories',
				href: '/categories',
				permission: 'view_categories',
				icon: ContainerIcon,
			},
			{
				title: 'Posts',
				href: '/admin/posts',
				permission: 'view_categories',
				icon: FileText,
			},
		],
	},
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href={dashboard()} prefetch>
								<AppLogo />
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={mainNavItems} />
			</SidebarContent>

			<SidebarFooter>
				{/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
