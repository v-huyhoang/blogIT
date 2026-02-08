import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { Eye, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { AuthMascot } from '@/components/auth-mascot';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
	const [focusedField, setFocusedField] = useState<
		'idle' | 'name' | 'email' | 'password' | 'password_confirmation'
	>('idle');
	const [passVisible, setPassVisible] = useState(false);
	const [confirmVisible, setConfirmVisible] = useState(false);

	let mascotState: 'idle' | 'typing' | 'password' = 'idle';
	if (focusedField === 'password') {
		mascotState = passVisible ? 'typing' : 'password';
	} else if (focusedField === 'password_confirmation') {
		mascotState = confirmVisible ? 'typing' : 'password';
	} else if (focusedField !== 'idle') {
		mascotState = 'typing';
	}

	return (
		<AuthLayout
			title="Register an account"
			description="Access engineering secrets"
		>
			<Head title="Register" />

			<div className="-mt-4 mb-4 flex origin-center scale-75 justify-center">
				<AuthMascot state={mascotState} />
			</div>

			<Form
				{...RegisteredUserController.store.form()}
				resetOnSuccess={['password', 'password_confirmation']}
				disableWhileProcessing
				className="flex flex-col gap-4"
			>
				{({ processing, errors }) => (
					<>
						<div className="grid gap-3">
							<div className="grid gap-1.5">
								<Label
									htmlFor="name"
									className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
								>
									Full Name
								</Label>
								<Input
									id="name"
									type="text"
									required
									autoFocus
									tabIndex={1}
									autoComplete="name"
									name="name"
									placeholder="Alex Johnson"
									suffixIcon={<Eye className="size-4" />}
									onFocus={() => setFocusedField('name')}
									onBlur={() => setFocusedField('idle')}
									className="h-10 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>
								<InputError message={errors.name} />
							</div>

							<div className="grid gap-1.5">
								<Label
									htmlFor="email"
									className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
								>
									Email Address
								</Label>
								<Input
									id="email"
									type="email"
									required
									tabIndex={2}
									autoComplete="email"
									name="email"
									placeholder="alex@example.com"
									suffixIcon={<Eye className="size-4" />}
									onFocus={() => setFocusedField('email')}
									onBlur={() => setFocusedField('idle')}
									className="h-10 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>
								<InputError message={errors.email} />
							</div>

							<div className="grid gap-1.5">
								<Label
									htmlFor="password"
									className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
								>
									Password
								</Label>
								<InputPassword
									id="password"
									name="password"
									required
									tabIndex={3}
									autoComplete="new-password"
									placeholder="••••••••"
									autoHideWhen={processing}
									buttonClassName="text-muted-foreground/50"
									onFocus={() => setFocusedField('password')}
									onBlur={() => setFocusedField('idle')}
									onToggle={setPassVisible}
									className="h-10 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>
								<InputError message={errors.password} />
							</div>

							<div className="grid gap-1.5">
								<Label
									htmlFor="password_confirmation"
									className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
								>
									Confirm
								</Label>
								<InputPassword
									id="password_confirmation"
									required
									name="password_confirmation"
									tabIndex={4}
									autoComplete="current-password"
									placeholder="••••••••"
									autoHideWhen={processing}
									buttonClassName="text-muted-foreground/50"
									onFocus={() =>
										setFocusedField('password_confirmation')
									}
									onBlur={() => setFocusedField('idle')}
									onToggle={setConfirmVisible}
									className="h-10 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>
								<InputError
									message={errors.password_confirmation}
								/>
							</div>

							<Button
								type="submit"
								className="mt-2 h-11 rounded-2xl bg-primary text-sm font-black tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98]"
								tabIndex={5}
								data-test="register-user-button"
							>
								{processing ? (
									<LoaderCircle className="h-5 w-5 animate-spin" />
								) : (
									'CREATE ACCOUNT'
								)}
							</Button>
						</div>

						<div className="text-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
							ALREADY REGISTERED?{' '}
							<TextLink
								href={login()}
								className="text-primary underline decoration-2 underline-offset-4"
								tabIndex={6}
							>
								LOG IN
							</TextLink>
						</div>
					</>
				)}
			</Form>
		</AuthLayout>
	);
}
