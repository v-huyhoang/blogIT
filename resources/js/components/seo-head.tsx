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
}: SeoProps) {
	const { seo } = usePage<SharedData>().props;

	const siteName = seo?.open_graph?.site_name || 'BlogIT';
	const defaultTitle = seo?.meta?.title;
	const defaultDescription = seo?.meta?.description;
	const defaultKeywords = seo?.meta?.keywords;
	const defaultImage = seo?.meta?.image;
	const defaultType = seo?.open_graph?.type;

	const finalTitle = title ? `${title} - ${siteName}` : defaultTitle;
	const finalDescription = description || defaultDescription;
	const finalKeywords = keywords || defaultKeywords;
	const finalImage = image || defaultImage;
	const finalType = type || defaultType;

	return (
		<Head>
			<title>{finalTitle}</title>
			<meta name="description" content={finalDescription} />
			<meta name="keywords" content={finalKeywords} />

			<meta property="og:title" content={finalTitle} />
			<meta property="og:description" content={finalDescription} />
			<meta property="og:image" content={finalImage} />
			<meta property="og:type" content={finalType} />
			<meta property="og:site_name" content={siteName} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={finalTitle} />
			<meta name="twitter:description" content={finalDescription} />
			<meta name="twitter:image" content={finalImage} />
		</Head>
	);
}
