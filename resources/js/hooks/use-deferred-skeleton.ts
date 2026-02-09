import { useEffect, useState } from 'react';

/**
 * Hook to manage deferred skeleton visibility.
 * Prevents "flickering" by waiting for a short delay before showing the skeleton.
 */
export function useDeferredSkeleton(data: unknown, delay: number = 200) {
	const [shouldShow, setShouldShow] = useState(false);

	useEffect(() => {
		if (data) {
			setShouldShow(false);
			return;
		}

		const timer = setTimeout(() => {
			setShouldShow(true);
		}, delay);

		return () => clearTimeout(timer);
	}, [data, delay]);

	return shouldShow;
}
