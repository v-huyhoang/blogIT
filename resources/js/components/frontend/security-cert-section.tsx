export function SecurityCertSection() {
	return (
		<div className="bg-background py-16 sm:py-24">
			<div className="container mx-auto px-6 lg:px-8">
				<h2 className="text-center text-lg leading-8 font-semibold text-foreground">
					Trusted by the world’s most innovative teams and security
					certified
				</h2>
				<div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
					<img
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
						src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
						alt="Transistor"
						width={158}
						height={48}
					/>
					<img
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
						src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
						alt="Reform"
						width={158}
						height={48}
					/>
					<img
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
						src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
						alt="Tuple"
						width={158}
						height={48}
					/>
					<img
						className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 dark:invert"
						src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
						alt="SavvyCal"
						width={158}
						height={48}
					/>
					<img
						className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 dark:invert"
						src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
						alt="Statamic"
						width={158}
						height={48}
					/>
				</div>
				<div className="mt-12 flex justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0">
					{/* Mock Certifications */}
					<div className="flex items-center gap-2 rounded-md border border-border p-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
							ISO
						</div>
						<span className="text-sm font-semibold">27001</span>
					</div>
					<div className="flex items-center gap-2 rounded-md border border-border p-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
							SOC
						</div>
						<span className="text-sm font-semibold">2 Type II</span>
					</div>
					<div className="flex items-center gap-2 rounded-md border border-border p-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
							GDPR
						</div>
						<span className="text-sm font-semibold">Compliant</span>
					</div>
				</div>
			</div>
		</div>
	);
}
