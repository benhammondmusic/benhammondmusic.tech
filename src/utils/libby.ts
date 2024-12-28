// types.ts
export interface LibbyBook {
	cover: {
		contentType: string;
		url: string;
		title: string;
		color: string;
		format: 'ebook' | 'audiobook';
	};
	title: {
		text: string;
		url: string;
		titleId: string;
	};
	author: string;
	publisher: string;
	isbn?: string;
	timestamp: number;
	activity: string;
	details: string;
	library: {
		text: string;
		url: string;
		key: string;
	};
}

export interface LibbyTimeline {
	version: number;
	timeline: LibbyBook[];
}

// utils/libbyFetcher.ts
export async function fetchLibbyTimeline(): Promise<LibbyTimeline> {
	const timelineUrl = import.meta.env.LIBBY_TIMELINE;

	if (!timelineUrl) {
		throw new Error('LIBBY_TIMELINE environment variable is not set');
	}

	try {
		const response = await fetch(timelineUrl);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: LibbyTimeline = await response.json();

		// Validate the response has the expected structure
		if (!data.timeline || !Array.isArray(data.timeline)) {
			throw new Error('Invalid timeline data structure');
		}

		return data;
	} catch (error) {
		console.error('Error fetching Libby timeline:', error);
		throw error;
	}
}
