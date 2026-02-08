import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PasswordInputProps } from '@/types';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

export function InputPassword({
	id,
	className,
	buttonClassName,
	showLabel = 'Show password',
	hideLabel = 'Hide password',
	defaultShow = false,
	autoHideWhen = false,
	onToggle,
	...props
}: PasswordInputProps) {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const [show, setShow] = useState(defaultShow);

	// sync if defaultShow change
	useEffect(() => {
		setShow(defaultShow);
	}, [defaultShow]);

	// auto hide when submit / processing
	useEffect(() => {
		if (autoHideWhen && show) {
			setShow(false);
		}
	}, [autoHideWhen, show]);

	const toggle = () => {
		setShow((prev) => {
			const next = !prev;
			onToggle?.(next);
			return next;
		});
	};

	return (
		<div className="relative">
			<Input
				{...props}
				id={inputId}
				type={show ? 'text' : 'password'}
				className={cn('pr-10', className)}
			/>

			<button
				type="button"
				onMouseDown={(e) => e.preventDefault()}
				onClick={toggle}
				aria-label={show ? hideLabel : showLabel}
				aria-pressed={show}
				tabIndex={-1}
				className={cn(
					'absolute top-1/2 right-[1px] -translate-y-1/2 rounded-md p-2',
					'text-muted-foreground hover:text-foreground',
					'hover:bg-accent focus:ring-2 focus:ring-ring focus:outline-none',
					buttonClassName,
				)}
			>
				{show ? (
					<Eye className="h-4 w-4" />
				) : (
					<EyeOff className="h-4 w-4" />
				)}
			</button>
		</div>
	);
}
