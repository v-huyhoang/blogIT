import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
	IconChevronDown,
	IconLayoutColumns,
	IconPlus,
	IconTrendingUp,
} from '@tabler/icons-react';
import { ChartBarLabel } from './partials/bar-chart-label';
import { SectionCards } from './partials/section-card';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: dashboard().url,
	},
];

export default function Dashboard() {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Dashboard" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<SectionCards />
					</div>
					<div className="flex flex-col gap-4 pb-8">
						<div className="px-4 lg:px-6">
							<div className="flex flex-col gap-4 lg:flex-row lg:gap-1">
								<div className="lg:w-3/4">
									<ChartBarLabel />
								</div>
								<div className="w-1/4 ps-3">
									<Card className="h-full">
										<CardHeader>
											<CardDescription>
												Growth Rate
											</CardDescription>
											<CardTitle className="text-2xl font-semibold tabular-nums">
												4.5%
											</CardTitle>
											<CardAction>
												<Select>
													<SelectTrigger className="w-full max-w-48">
														<SelectValue placeholder="Select a fruit" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectLabel>
																Fruits
															</SelectLabel>
															<SelectItem value="apple">
																Apple
															</SelectItem>
															<SelectItem value="banana">
																Banana
															</SelectItem>
															<SelectItem value="blueberry">
																Blueberry
															</SelectItem>
															<SelectItem value="grapes">
																Grapes
															</SelectItem>
															<SelectItem value="pineapple">
																Pineapple
															</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</CardAction>
										</CardHeader>
										<CardFooter className="flex-col items-start gap-1.5 text-sm">
											<div className="line-clamp-1 flex gap-2 font-medium">
												Steady performance increase{' '}
												<IconTrendingUp className="size-4" />
											</div>
											<div className="text-muted-foreground">
												Meets growth projections
											</div>
										</CardFooter>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="px-4 lg:px-6">
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle>Analysis</CardTitle>
						<CardAction>
							<div className="flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="sm">
											<IconLayoutColumns />
											<span className="hidden lg:inline">
												Customize Columns
											</span>
											<span className="lg:hidden">
												Columns
											</span>
											<IconChevronDown />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="w-56"
									>
										<DropdownMenuCheckboxItem
											className="capitalize"
											checked={true}
										>
											id
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem
											className="capitalize"
											checked={true}
										>
											name
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem
											className="capitalize"
											checked={true}
										>
											email
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem
											className="capitalize"
											checked={true}
										>
											roles
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem
											className="capitalize"
											checked={true}
										>
											created at
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem
											className="capitalize"
											checked={true}
										>
											actions
										</DropdownMenuCheckboxItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<Button variant="outline" size="sm">
									<IconPlus />
									<span className="hidden lg:inline">
										Add Section
									</span>
								</Button>
							</div>
						</CardAction>
					</CardHeader>
					<hr />
					<CardContent>
						<Table className="table-striped table">
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Roles</TableHead>
									<TableHead>Created At</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell className="flex flex-wrap items-center gap-2"></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
