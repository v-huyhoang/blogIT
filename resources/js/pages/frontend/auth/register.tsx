import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
	return (
		<AuthLayout
			title="Join the Elite"
			description="Create your account to access deep dives and engineering secrets"
		>
			<Head title="Register" />
			<Form
				{...RegisteredUserController.store.form()}
				resetOnSuccess={['password', 'password_confirmation']}
				disableWhileProcessing
				className="flex flex-col gap-8"
			>
				{({ processing, errors }) => (
					<>
						<div className="grid gap-6">
							<div className="grid gap-3">
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
									className="h-12 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>
								<InputError message={errors.name} />
							</div>

							<div className="grid gap-3">
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
									className="h-12 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>
								<InputError message={errors.email} />
							</div>

							<div className="grid gap-3">
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
									className="h-12 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>
								<InputError message={errors.password} />
							</div>

							<div className="grid gap-3">
								<Label
									htmlFor="password_confirmation"
									className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
								>
									Confirm Password
								</Label>
								<InputPassword
									id="password_confirmation"
									required
									name="password_confirmation"
									tabIndex={4}
									autoComplete="current-password"
									placeholder="••••••••"
									autoHideWhen={processing}
									className="h-12 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>
								<InputError
									message={errors.password_confirmation}
								/>
							</div>

							<Button
								type="submit"
								className="mt-4 h-14 rounded-2xl bg-primary text-sm font-black tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98]"
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

						<div className="text-center text-xs font-bold text-muted-foreground">
							ALREADY HAVE AN ACCOUNT?{' '}
							<TextLink
								href={login()}
								className="tracking-widest text-primary underline decoration-2 underline-offset-4"
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
