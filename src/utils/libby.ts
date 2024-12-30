import { fetchBookSafely } from "./openLibrary";

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
	subjects?: string[]; // Added subjects field
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

		// Get all valid ISBNs
		const booksWithIsbn = data.timeline.filter((book): book is LibbyBook & { isbn: string } =>
			Boolean(book.isbn)
		);

		// Fetch subjects for all books with ISBNs concurrently
		const bookSubjects = await Promise.allSettled(
			booksWithIsbn.map(async (book) => {
				const result = await fetchBookSafely(book.isbn);
				return {
					isbn: book.isbn,
					subjects: result.success ? result.data.subjects : []
				};
			})
		);

		// Create a map of ISBN to subjects for easy lookup
		const subjectsMap = new Map(
			bookSubjects.map((result, index) => {
				if (result.status === 'fulfilled') {
					return [booksWithIsbn[index]?.isbn, result.value.subjects];
				}
				return [booksWithIsbn[index]?.isbn, []];
			})
		);

		// Update the timeline entries with subjects
		const updatedTimeline = data.timeline.map(book => ({
			...book,
			subjects: book.isbn ? subjectsMap.get(book.isbn) || [] : []
		}));

		return {
			version: data.version,
			timeline: updatedTimeline
		};
	} catch (error) {
		console.error('Error fetching Libby timeline:', error);
		throw error;
	}
}