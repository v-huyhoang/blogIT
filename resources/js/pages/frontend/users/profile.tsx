import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import UserLayout from '@/layouts/frontend/user-layout';
import { Head } from '@inertiajs/react';
import { Bell, Camera, Mail, MessageSquare } from 'lucide-react';

export default function UserProfile() {
	return (
		<UserLayout>
			<Head title="Profile Settings - BlogIT" />
			<div className="space-y-8">
				{/* Profile Info */}
				<div className="rounded-3xl border border-border/50 bg-card p-10 shadow-2xl shadow-primary/5">
					<div className="mb-12 flex flex-col items-center gap-12 md:flex-row">
						<div className="group relative">
							<div className="h-40 w-40 overflow-hidden rounded-3xl ring-8 ring-primary/5">
								<img
									src="https://i.pravatar.cc/300?u=user"
									className="h-full w-full object-cover"
									alt=""
								/>
							</div>
							<button className="absolute -right-2 -bottom-2 rounded-2xl bg-primary p-3 text-white shadow-xl transition-transform hover:scale-110">
								<Camera className="h-5 w-5" />
							</button>
						</div>
						<div className="text-center md:text-left">
							<h2 className="mb-2 text-4xl font-black tracking-tighter">
								John Doe
							</h2>
							<p className="font-medium text-muted-foreground">
								Software Engineer based in Tokyo.
							</p>
						</div>
					</div>

					<form className="space-y-8">
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
							<div className="space-y-3">
								<Label className="ml-2 text-xs font-bold tracking-widest uppercase opacity-50">
									Full Name
								</Label>
								<Input
									defaultValue="John Doe"
									className="h-14 rounded-2xl border-none bg-secondary/30 px-6 font-bold"
								/>
							</div>
							<div className="space-y-3">
								<Label className="ml-2 text-xs font-bold tracking-widest uppercase opacity-50">
									Email Address
								</Label>
								<Input
									type="email"
									defaultValue="john@example.com"
									className="h-14 rounded-2xl border-none bg-secondary/30 px-6 font-bold"
								/>
							</div>
						</div>
						<div className="space-y-3">
							<Label className="ml-2 text-xs font-bold tracking-widest uppercase opacity-50">
								Biography
							</Label>
							<textarea
								className="min-h-[150px] w-full rounded-2xl border-none bg-secondary/30 p-6 font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none"
								defaultValue="I'm a passionate developer exploring the depths of React and Laravel."
							/>
						</div>
					</form>
				</div>

				{/* Notifications Settings */}
				<div className="rounded-3xl border border-border/50 bg-card p-10 shadow-2xl shadow-primary/5">
					<h3 className="mb-10 flex items-center gap-3 text-2xl font-black">
						<Bell className="h-6 w-6 text-primary" /> Delivery
						Channels
					</h3>

					<div className="space-y-8">
						{[
							{
								id: 'email',
								label: 'Email Notifications',
								desc: 'Daily digest and important security alerts.',
								icon: Mail,
							},
							{
								id: 'slack',
								label: 'Slack Integration',
								desc: 'Real-time alerts in your chosen workspace.',
								icon: MessageSquare,
							},
							{
								id: 'chatwork',
								label: 'ChatWork Alerts',
								desc: 'Stay updated in your ChatWork rooms.',
								icon: MessageSquare,
							},
							{
								id: 'onsite',
								label: 'On-site Notifications',
								desc: 'Bell alerts while browsing the platform.',
								icon: Bell,
							},
						].map((chan) => (
							<div
								key={chan.id}
								className="flex items-center justify-between rounded-3xl bg-secondary/20 p-6 transition-all hover:bg-secondary/40"
							>
								<div className="flex items-center gap-6">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background text-primary shadow-inner">
										<chan.icon className="h-5 w-5" />
									</div>
									<div>
										<p className="mb-0.5 font-black text-foreground">
											{chan.label}
										</p>
										<p className="text-xs font-medium text-muted-foreground">
											{chan.desc}
										</p>
									</div>
								</div>
								<Switch
									defaultChecked={chan.id !== 'slack'}
									className="data-[state=checked]:bg-primary"
								/>
							</div>
						))}
					</div>

					<div className="mt-12 flex items-center justify-end gap-4">
						<Button
							variant="destructive"
							className="h-14 rounded-full px-8 font-bold"
						>
							Discard
						</Button>
						<Button className="h-14 rounded-full bg-primary px-12 font-black shadow-xl shadow-primary/20">
							Save Preferences
						</Button>
					</div>
				</div>
			</div>
		</UserLayout>
	);
}
