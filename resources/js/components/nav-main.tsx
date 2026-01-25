import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { usePermissions } from '@/hooks/use-permissions';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
	const page = usePage();
	const { can } = usePermissions();
	return (
		<SidebarGroup className="px-2 py-0">
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					if (item.permission && !can(item.permission)) return null;

					const isChildActive = item.items?.some((subItem) =>
						page.url.startsWith(
							typeof subItem.href === 'string'
								? subItem.href
								: subItem.href.url,
						),
					);

					if (item.items && item.items.length > 0) {
						return (
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={item.isActive || isChildActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton
											className="hover:cursor-pointer"
											tooltip={item.title}
											isActive={
												item.isActive ||
												isChildActive ||
												page.url.startsWith(
													typeof item.href ===
														'string'
														? item.href
														: item.href.url,
												)
											}
										>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items.map((subItem) => (
												<SidebarMenuSubItem
													key={subItem.title}
												>
													<SidebarMenuSubButton
														asChild
														isActive={page.url.startsWith(
															typeof subItem.href ===
																'string'
																? subItem.href
																: subItem.href
																		.url,
														)}
													>
														<Link
															href={subItem.href}
														>
															{subItem.icon && (
																<subItem.icon />
															)}
															<span>
																{subItem.title}
															</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						);
					}

					return (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								isActive={page.url.startsWith(
									typeof item.href === 'string'
										? item.href
										: item.href.url,
								)}
								tooltip={item.title}
							>
								<Link href={item.href} prefetch>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
