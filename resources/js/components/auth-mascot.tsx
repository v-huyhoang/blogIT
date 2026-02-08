import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type MascotState = 'idle' | 'typing' | 'password';

export function AuthMascot({ state }: { state: MascotState }) {
	const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if (state === 'typing') {
			setEyePosition({ x: 0, y: 10 });
		} else {
			setEyePosition({ x: 0, y: 0 });
		}
	}, [state]);

	return (
		<div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full bg-slate-100 select-none dark:bg-slate-800">
			<svg
				viewBox="0 0 200 200"
				className="h-full w-full"
				aria-hidden="true"
			>
				{/* Head */}
				<circle
					cx="100"
					cy="120"
					r="70"
					className="fill-slate-800 dark:fill-slate-200"
				/>

				{/* Ears */}
				<circle
					cx="40"
					cy="70"
					r="25"
					className="fill-slate-800 dark:fill-slate-200"
				/>
				<circle
					cx="160"
					cy="70"
					r="25"
					className="fill-slate-800 dark:fill-slate-200"
				/>
				<circle
					cx="40"
					cy="70"
					r="15"
					className="fill-slate-600 dark:fill-slate-400"
				/>
				<circle
					cx="160"
					cy="70"
					r="15"
					className="fill-slate-600 dark:fill-slate-400"
				/>

				{/* Face Background */}
				<ellipse
					cx="100"
					cy="130"
					rx="55"
					ry="45"
					className="fill-slate-300 dark:fill-slate-600"
				/>

				{/* Snout */}
				<ellipse
					cx="100"
					cy="140"
					rx="20"
					ry="15"
					className="fill-slate-800 dark:fill-slate-200"
				/>
				<circle
					cx="100"
					cy="135"
					r="5"
					className="fill-black dark:fill-slate-800"
				/>

				{/* Eyes Container */}
				<g
					className="transition-transform duration-200"
					style={{
						transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
					}}
				>
					{/* Left Eye */}
					<circle cx="75" cy="115" r="12" className="fill-white" />
					<circle cx="75" cy="115" r="4" className="fill-black" />

					{/* Right Eye */}
					<circle cx="125" cy="115" r="12" className="fill-white" />
					<circle cx="125" cy="115" r="4" className="fill-black" />
				</g>

				{/* Hands (Hidden by default, visible on password) */}
				<g
					className={cn(
						'transition-all duration-300 ease-out',
						state === 'password'
							? 'translate-y-0 opacity-100'
							: 'translate-y-20 opacity-0',
					)}
				>
					<path
						d="M40 160 C 40 120, 80 100, 95 120 C 100 130, 80 150, 60 200"
						className="fill-slate-800 stroke-none dark:fill-slate-200"
					/>
					<path
						d="M160 160 C 160 120, 120 100, 105 120 C 100 130, 120 150, 140 200"
						className="fill-slate-800 stroke-none dark:fill-slate-200"
					/>
				</g>
			</svg>
		</div>
	);
}
