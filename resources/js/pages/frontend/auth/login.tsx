import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { AuthMascot } from '@/components/auth-mascot';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
	status?: string;
	canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
	const [focusedField, setFocusedField] = useState<
		'idle' | 'typing' | 'password'
	>('idle');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const mascotState =
		focusedField === 'password' && isPasswordVisible
			? 'typing'
			: focusedField;

	return (
		<AuthLayout
			title="Welcome Back"
			description="Log in to continue your journey"
		>
			<Head title="Log in" />

			<div className="mb-4 flex scale-90 justify-center">
				<AuthMascot state={mascotState} />
			</div>

			<Form
				{...AuthenticatedSessionController.store.form()}
				resetOnSuccess={['password']}
				className="flex flex-col gap-6"
			>
				{({ processing, errors }) => (
					<>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label
									htmlFor="email"
									className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
								>
									Email Address
								</Label>
								<Input
									id="email"
									type="email"
									name="email"
									required
									autoFocus
									tabIndex={1}
									autoComplete="email"
									placeholder="name@company.com"
									onFocus={() => setFocusedField('typing')}
									onBlur={() => setFocusedField('idle')}
									className="h-11 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>
								<InputError message={errors.email} />
							</div>

							<div className="grid gap-2">
								<div className="flex items-center">
									<Label
										htmlFor="password"
										className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
									>
										Password
									</Label>
									{canResetPassword && (
										<TextLink
											href={request()}
											className="ml-auto text-[10px] font-black tracking-widest text-primary uppercase"
											tabIndex={5}
										>
											Forgot?
										</TextLink>
									)}
								</div>
								<InputPassword
									id="password"
									name="password"
									required
									tabIndex={2}
									autoComplete="current-password"
									placeholder="••••••••"
									autoHideWhen={processing}
									buttonClassName="text-muted-foreground/50"
									onFocus={() => setFocusedField('password')}
									onBlur={() => setFocusedField('idle')}
									onToggle={() =>
										setIsPasswordVisible((prev) => !prev)
									}
									className="h-11 rounded-2xl border-border/50 bg-background/50 px-5 focus:ring-primary/20"
								/>

								<InputError message={errors.password} />
							</div>

							<div className="flex items-center space-x-3">
								<Checkbox
									id="remember"
									name="remember"
									tabIndex={3}
									className="h-5 w-5 rounded-md border-border/50 hover:cursor-pointer data-[state=checked]:border-primary data-[state=checked]:bg-primary"
								/>
								<Label
									htmlFor="remember"
									className="text-xs font-bold text-muted-foreground select-none hover:cursor-pointer"
								>
									Remember me
								</Label>
							</div>

							<Button
								type="submit"
								className="mt-2 h-12 rounded-2xl bg-primary text-sm font-black tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98]"
								tabIndex={4}
								disabled={processing}
								data-test="login-button"
							>
								{processing ? (
									<LoaderCircle className="h-5 w-5 animate-spin" />
								) : (
									'AUTHENTICATE'
								)}
							</Button>
						</div>

						<div className="text-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
							NEW TO BLOGIT?{' '}
							<TextLink
								href={register()}
								className="text-primary underline decoration-2 underline-offset-4"
								tabIndex={5}
							>
								CREATE ACCOUNT
							</TextLink>
						</div>
					</>
				)}
			</Form>

			{status && (
				<div className="mb-4 text-center text-sm font-medium text-green-600">
					{status}
				</div>
			)}
		</AuthLayout>
	);
}
