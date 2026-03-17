import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import FeatureCard from "./partials/feature-card";
import StatCard from "./partials/stat-card";
import ProjectCard from "./partials/project-card";
import EmptyCard from "./partials/empty-card";

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'HandlePdfs',
		href: '/handlepdfs',
	},
];

export default function HandlePdfs() {

	// const { hasRole } = useAuth();

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div className="max-w-7xl mx-auto">
					{/* Header Section */}
					<header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

						{/* Page Heading */}
						<div className="flex-grow">
							<h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
								Hello, Alex!
							</h1>
							<p className="text-slate-500 dark:text-[#92a4c9] text-base font-normal leading-normal mt-2">
								Welcome back, let's create something amazing today.
							</p>
						</div>

						{/* Search + Toolbar */}
						<div className="flex items-center gap-4 w-full md:w-auto">

							{/* Search Bar */}
							<div className="flex-grow md:flex-grow-0 md:w-72">
								<label className="flex flex-col h-12 w-full">
									<div className="flex w-full items-stretch rounded-lg h-full">
										<div className="text-slate-500 dark:text-[#92a4c9] flex 
											border border-slate-200/10 dark:border-slate-800 
											bg-white dark:bg-[#192233] items-center justify-center 
											pl-4 rounded-l-lg border-r-0">
											<span className="material-symbols-outlined">search</span>
										</div>
										<input
											className="form-input flex w-full min-w-0 flex-1 resize-none 
											overflow-hidden rounded-lg text-slate-800 dark:text-white 
											focus:outline-0 focus:ring-2 focus:ring-primary border 
											border-slate-200/10 dark:border-slate-800 bg-white 
											dark:bg-[#192233] placeholder:text-slate-500 
											dark:placeholder:text-[#92a4c9] px-4 rounded-l-none 
											border-l-0 pl-2 text-base font-normal leading-normal"
											placeholder="Search projects..."
										/>
									</div>
								</label>
							</div>

							{/* Toolbar */}
							<div className="flex gap-2">
								<button className="p-3 text-slate-500 dark:text-white rounded-lg 
									border border-slate-200/10 dark:border-slate-800 
									bg-white dark:bg-[#192233] hover:bg-slate-100 
									dark:hover:bg-slate-800 transition-colors duration-200">
									<span className="material-symbols-outlined">notifications</span>
								</button>

								<button className="p-3 text-slate-500 dark:text-white rounded-lg 
									border border-slate-200/10 dark:border-slate-800 
									bg-white dark:bg-[#192233] hover:bg-slate-100 
									dark:hover:bg-slate-800 transition-colors duration-200">
									<span className="material-symbols-outlined">chat_bubble</span>
								</button>
							</div>
						</div>
					</header>

					{/* Quick Access Section */}
					<section className="mb-10">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

							{/* Box Item */}
							<FeatureCard
								icon="comic_bubble"
								title="New Comic Strip"
								desc="Generate comics from prompts"
							/>

							<FeatureCard
								icon="movie"
								title="New Story Video"
								desc="Turn your stories into videos"
							/>

							<FeatureCard
								icon="edit_note"
								title="AI Script Helper"
								desc="Get help writing your script"
							/>
						</div>
					</section>

					{/* Statistics */}
					<section className="mb-10">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<StatCard label="Total Projects" value="28" />
							<StatCard label="Videos Exported" value="12" />
							<StatCard label="Comics Generated" value="16" />
						</div>
					</section>

					{/* Recent Projects */}
					<section>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-2xl font-bold text-slate-900 dark:text-white">
								Recent Projects
							</h3>
							<a className="text-sm font-medium text-primary hover:underline" href="#">
								See All Projects
							</a>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

							<ProjectCard
								image="https://lh3.googleusercontent.com/aida-public/AB6AXuClR4qCTsCQkdD9n-VqBrwlkt5cfhs0j4kG0k4FHCJM12HzSZ14rsnXTVm1gchx2TnhYAxowmESCW24Yuum4ZeLo1QQo4BesfNMttNAsjE4ONb7bu7eb04M-0avOjbOoidgryAPIqVlSJGHwPw6Kl5lAiIGfCoE5mfZglw1_cuUrNSBaEge4X7vp5fXZv99c53icBTnwtIXNCikG8e9BJ3VvwQGam6StQB-is3l5lPysyk80wZE3aXwN5GTHShOnOgpS026GnxSZSA"
								title="Space Adventure Ep. 1"
								time="Edited 2 hours ago"
							/>

							<ProjectCard
								image="https://lh3.googleusercontent.com/aida-public/AB6AXuAxW1qK0f_aJ2Su3C-A0V4YJ_tKRQiqyhMqbYRR5oSEDooW-jRN_vy7vlutmeJlsB-bWSbGK37LYt5KbpGgGU3HxpGI1eSPTHDgsZMxYWhY7ru3F0W3-DG63VQDuHobVp8qaOCTJICeroEgcrQrcPrgUDueWFq3EH_3wkFaMlXgJBEr8ReJNz5kiluKELuqjdIt1PC4KlVCBXUGZkRJ9YSUZRrDuvtsUKOkKBJf_21GC5aCqUQo_TjYubtxUIFGYQakBKZ3hSolQm4"
								title="Cybernetic Dreams"
								time="Edited 1 day ago"
							/>

							<ProjectCard
								image="https://lh3.googleusercontent.com/aida-public/AB6AXuAppEPFqvIDSVj-f-yhnFV8mAeyTQgP-R97-k9NC4hVRvSlmCQNw4D-6rjk0twBhMLKLvOtFKolI48HwHCAMMSdHvI7eKIKBZcsJ9Ktjv2q1LF726yOwV3VTqGWaBYFZxEiFTm3zackN2QyufGgYnEYt23y8ih04gr5qqE2uuA_vBSkcj_hEjow86F4sBKdorRaG0JC1GsxGbwxyXn4SOsM1sMnsbKVV9s8s7OEpU7QhoQ3VHPuEgep55j9fvMwkaPQo463vvowOW8"
								title="Chronicles of Fire"
								time="Edited 3 days ago"
							/>

							{/* Empty Card */}
							<EmptyCard />
						</div>
					</section>

				</div>
			</div>
		</AppLayout>
	);
}