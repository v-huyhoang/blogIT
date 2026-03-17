type StatCardProps = {
	label: string
	value: string
}

const StatCard = ({ label, value }: StatCardProps) => {
	return (
		<div className="p-6 rounded-xl bg-white dark:bg-[#192233] 
			border border-slate-200/10 dark:border-slate-800">
			<p className="text-sm font-medium text-slate-500 dark:text-[#92a4c9]">{label}</p>
			<p className="text-4xl font-black text-slate-900 dark:text-white mt-2">{value}</p>
		</div>
	);
}

export default StatCard