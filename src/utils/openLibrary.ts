interface Author {
	name: string;
	url?: string;
}

interface Publisher {
	name: string;
}

interface Cover {
	small?: string;
	medium?: string;
	large?: string;
}

interface Subject {
	name: string;
	url?: string;
}

interface BookData {
	title: string;
	authors: Author[];
	publishers?: Publisher[];
	publish_date?: string;
	number_of_pages?: number;
	cover?: Cover;
	subjects?: Subject[];
}

interface OpenLibraryResponse {
	[key: string]: BookData;
}

interface BookInfo {
	title?: string;
	authors?: string[];
	publisher: string | null;
	publishDate: string | null;
	numberOfPages: number | null;
	coverUrl: string | null;
	subjects: string[];
}

async function fetchBookByIsbn(isbn: string): Promise<BookInfo | null> {
	// Clean ISBN by removing hyphens and spaces
	const cleanIsbn = isbn.replace(/[-\s]/g, '');

	// Open Library API endpoint
	const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${cleanIsbn}&format=json&jscmd=data`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: OpenLibraryResponse = await response.json();
		const bookKey = `ISBN:${cleanIsbn}`;

		if (bookKey in data) {
			const bookData = data[bookKey];

			const bookInfo: BookInfo = {
				title: bookData?.title,
				authors: bookData?.authors.map(author => author.name),
				publisher: bookData?.publishers?.[0]?.name ?? null,
				publishDate: bookData?.publish_date ?? null,
				numberOfPages: bookData?.number_of_pages ?? null,
				coverUrl: bookData?.cover?.large ?? null,
				subjects: bookData?.subjects?.map(subject => subject.name) ?? [],
			};

			return bookInfo;
		}

		return null;

	} catch (error) {
		console.error('Error fetching book data:', error);
		throw error;
	}
}

// Error handling utility type
type Result<T> = {
	success: true;
	data: T;
} | {
	success: false;
	error: string;
};

// Wrapper function with error handling
export async function fetchBookSafely(isbn: string): Promise<Result<BookInfo>> {
	try {
		const bookInfo = await fetchBookByIsbn(isbn);
		if (!bookInfo) {
			return {
				success: false,
				error: 'Book not found'
			};
		}
		return {
			success: true,
			data: bookInfo
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : 'An unknown error occurred'
		};
	}
}
