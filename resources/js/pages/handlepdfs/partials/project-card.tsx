type ProjectCardProps = {
	image: string
	title: string
	time: string
}

const ProjectCard = ({ image, title, time }: ProjectCardProps) => {
	return (
		<div className="flex flex-col bg-white dark:bg-[#192233] rounded-xl 
			border border-slate-200/10 dark:border-slate-800 overflow-hidden group">
			<div
				className="aspect-video bg-cover bg-center"
				style={{ backgroundImage: `url('${image}')` }}
			></div>

			<div className="p-4 flex flex-col flex-grow">
				<h4 className="font-bold text-slate-900 dark:text-white flex-grow">{title}</h4>
				<p className="text-sm text-slate-500 dark:text-[#92a4c9] mt-1">{time}</p>

				<div className="flex gap-2 mt-4">
					<button className="text-xs font-bold py-2 px-3 bg-primary/10 text-primary rounded-md hover:bg-primary/20">
						Edit
					</button>
					<button className="text-xs font-bold py-2 px-3 bg-slate-100 dark:bg-slate-700 
						text-slate-600 dark:text-slate-300 rounded-md 
						hover:bg-slate-200 dark:hover:bg-slate-600">
						Preview
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProjectCard