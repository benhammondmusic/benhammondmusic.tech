import { GradientText, Section } from "@/astro-boilerplate-components";
import { LibbyTimeline } from "@/utils/libby";
import { useState } from 'react';


interface LibbyStuffProps {
	timeline: LibbyTimeline
}

function LibbyStuff(props: LibbyStuffProps) {
	const { timeline } = props;
	const [displayLimit, setDisplayLimit] = useState(6);
	const showingAll = displayLimit >= timeline.timeline.length;

	// Calculate some interesting statistics
	const uniqueAuthors = new Set(timeline.timeline.map(book => book.author)).size;
	const uniqueBooks = new Set(timeline.timeline.map(book => book.title.text)).size;
	const ebookCount = timeline.timeline.filter(book => book.cover.format === 'ebook').length;
	const audiobookCount = timeline.timeline.filter(book => book.cover.format === 'audiobook').length;

	// Get the date range
	const mostRecent = new Date(Math.max(...timeline.timeline.map(book => book.timestamp)));
	const oldest = new Date(Math.min(...timeline.timeline.map(book => book.timestamp)));

	// Format date for display
	const formatDate = (date: any) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			year: 'numeric'
		});
	};

	const handleShowMore = () => {
		setDisplayLimit(timeline.timeline.length);
	};

	return (
		<Section
			title={
				<div className="font-rubik">
					Libby <GradientText>Reading Timeline</GradientText>
				</div>
			}
		>
			<div className="flex flex-col gap-6 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md p-6">
				{/* Stats Overview */}
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					<div className="flex flex-col items-center p-4 bg-slate-700 rounded-lg">
						<span className="text-2xl font-bold text-white">{uniqueBooks}</span>
						<span className="text-sm text-gray-300">Books Read</span>
					</div>
					<div className="flex flex-col items-center p-4 bg-slate-700 rounded-lg">
						<span className="text-2xl font-bold text-white">{uniqueAuthors}</span>
						<span className="text-sm text-gray-300">Authors</span>
					</div>
					<div className="flex flex-col items-center p-4 bg-slate-700 rounded-lg">
						<span className="text-2xl font-bold text-white">{ebookCount}</span>
						<span className="text-sm text-gray-300">eBooks</span>
					</div>
					<div className="flex flex-col items-center p-4 bg-slate-700 rounded-lg">
						<span className="text-2xl font-bold text-white">{audiobookCount}</span>
						<span className="text-sm text-gray-300">Audiobooks</span>
					</div>
				</div>

				{/* Timeline */}
				<div className="mt-6">
					<h3 className="text-lg font-semibold text-white mb-4">
						Reading History ({formatDate(oldest)} - {formatDate(mostRecent)})
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{timeline.timeline.slice(0, displayLimit).map((book, index) => (
							<div key={index} className="flex bg-slate-700 rounded-lg overflow-hidden">
								<div className="w-1/4 relative min-h-40">
									<div
										className="absolute inset-0 bg-cover bg-center"
										style={{
											backgroundColor: book.cover.color,
											backgroundImage: `url(${book.cover.url})`,
											paddingBottom: '150%',
										}}
									/>
								</div>
								<div className="w-3/4 p-4">
									<h4 className="font-semibold text-white mb-1 line-clamp-2">{book.title.text}</h4>
									<p className="text-sm text-gray-300 mb-2 line-clamp-1">{book.author}</p>
									<div className="flex items-center gap-2">
										<span className={`text-xs px-2 py-1 rounded ${book.cover.format === 'ebook'
											? 'bg-blue-500 text-white'
											: 'bg-purple-500 text-white'
											}`}>
											{book.cover.format}
										</span>
										<span className="text-xs text-gray-400">
											{formatDate(book.timestamp)}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					{!showingAll && (
						<div className="mt-6 text-center">
							<button
								onClick={handleShowMore}
								className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors"
							>
								Show More Books
							</button>
						</div>
					)}
				</div>
			</div>
		</Section>
	);
}

export { LibbyStuff };