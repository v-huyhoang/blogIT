const EmptyCard = () => {
	return (
		<div className="flex flex-col bg-transparent rounded-xl border-2 border-dashed 
			border-slate-300 dark:border-slate-700 items-center justify-center 
			p-4 min-h-[260px]">
			<div className="text-center">
				<div className="mx-auto flex items-center justify-center size-12 
					rounded-full bg-primary/10 mb-4">
					<span className="material-symbols-outlined text-primary !text-3xl">add</span>
				</div>
				<h4 className="font-bold text-slate-900 dark:text-white">Start a new project</h4>
				<p className="text-sm text-slate-500 dark:text-[#92a4c9] mt-1">
					Create your first comic or video.
				</p>
				<button className="text-sm font-bold py-2 px-4 bg-primary text-white 
					rounded-lg mt-4 hover:bg-primary/90 transition-colors">
					Create Now
				</button>
			</div>
		</div>
	);
}

export default EmptyCard