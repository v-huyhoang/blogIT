import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface SeoProps {
	title?: string;
	description?: string;
	keywords?: string;
	image?: string;
	type?: string;
}

export function SeoHead({
	title,
	description,
	keywords,
	image,
	type,
}: Partial<SeoProps>) {
	const { seo, pageSeo } = usePage<SharedData>().props;

	console.log(pageSeo);
	const siteName = seo.open_graph.site_name;

	const meta = seo.meta;

	// Priority: Component > Page override > Shared default
	const finalTitle = title ?? pageSeo?.title ?? meta.title;

	const displayTitle = finalTitle.includes(siteName)
		? finalTitle
		: `${finalTitle} - ${siteName}`;

	const finalDescription =
		description ?? pageSeo?.description ?? meta.description;

	const finalKeywords = keywords ?? pageSeo?.keywords ?? meta.keywords;

	const finalImage = image ?? pageSeo?.image ?? meta.image;

	const finalType = type ?? pageSeo?.type ?? seo.open_graph.type;

	const pagination = pageSeo?.pagination;

	const url = typeof window !== 'undefined' ? window.location.href : '';

	const canonical = url.replace('?page=1', '');

	return (
		<Head>
			<title>{displayTitle}</title>

			<meta name="description" content={finalDescription} />
			<meta name="keywords" content={finalKeywords} />

			{/* Canonical */}
			<link rel="canonical" href={canonical} />

			{/* Pagination SEO */}
			{pagination?.prev && <link rel="prev" href={pagination.prev} />}

			{pagination?.next && <link rel="next" href={pagination.next} />}

			{/* OpenGraph */}
			<meta property="og:title" content={displayTitle} />
			<meta property="og:description" content={finalDescription} />
			<meta property="og:type" content={finalType} />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:image" content={finalImage} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={displayTitle} />
			<meta name="twitter:description" content={finalDescription} />
			<meta name="twitter:image" content={finalImage} />
		</Head>
	);
}
