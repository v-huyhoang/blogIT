export function CodePreviewSection() {
	return (
		<div className="bg-background py-24 sm:py-32">
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Integration made simple
					</h2>
					<p className="mt-6 text-lg leading-8 text-muted-foreground">
						Embed our powerful blog engine into your existing
						application with just a few lines of code.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
					<div className="w-full rounded-xl bg-slate-900 shadow-2xl ring-1 ring-white/10">
						<div className="flex border-b border-white/5 bg-slate-900/50 p-4">
							<div className="flex space-x-2">
								<div className="h-3 w-3 rounded-full bg-red-500"></div>
								<div className="h-3 w-3 rounded-full bg-yellow-500"></div>
								<div className="h-3 w-3 rounded-full bg-green-500"></div>
							</div>
						</div>
						<div className="overflow-x-auto p-8">
							<pre className="font-mono text-sm leading-relaxed text-slate-300">
								<code>
									<span className="text-purple-400">
										import
									</span>{' '}
									{'{'} BlogClient {'}'}{' '}
									<span className="text-purple-400">
										from
									</span>{' '}
									<span className="text-green-400">
										'@blogit/sdk'
									</span>
									;<br />
									<br />
									<span className="text-slate-500">
										// Initialize the client
									</span>
									<br />
									<span className="text-purple-400">
										const
									</span>{' '}
									client ={' '}
									<span className="text-purple-400">new</span>{' '}
									BlogClient({'{'}
									<br />
									&nbsp;&nbsp;apiKey:{' '}
									<span className="text-green-400">
										'your_api_key'
									</span>
									,<br />
									&nbsp;&nbsp;projectId:{' '}
									<span className="text-blue-400">12345</span>
									<br />
									{'}'});
									<br />
									<br />
									<span className="text-slate-500">
										// Fetch latest posts
									</span>
									<br />
									<span className="text-purple-400">
										const
									</span>{' '}
									posts ={' '}
									<span className="text-purple-400">
										await
									</span>{' '}
									client.posts.list({'{'}
									<br />
									&nbsp;&nbsp;limit:{' '}
									<span className="text-blue-400">10</span>,
									<br />
									&nbsp;&nbsp;sort:{' '}
									<span className="text-green-400">
										'desc'
									</span>
									<br />
									{'}'});
									<br />
									<br />
									console.log(posts);
								</code>
							</pre>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
