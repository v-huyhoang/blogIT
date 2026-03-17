type FeatureCardProps = {
	icon: string
	title: string
	desc: string
}

const FeatureCard = ({ icon, title, desc }: FeatureCardProps) => {
	return (
		<div className="flex flex-1 gap-4 rounded-xl border border-slate-200/10 
			dark:border-slate-800 bg-white dark:bg-[#192233] p-6 flex-col 
			hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 
			transition-all duration-300 cursor-pointer">

			<div className="text-primary text-3xl">
				<span className="material-symbols-outlined !text-4xl">{icon}</span>
			</div>

			<div className="flex flex-col gap-1 mt-2">
				<h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
					{title}
				</h2>
				<p className="text-slate-500 dark:text-[#92a4c9] text-sm leading-normal">
					{desc}
				</p>
			</div>
		</div>
	)
}

export default FeatureCard