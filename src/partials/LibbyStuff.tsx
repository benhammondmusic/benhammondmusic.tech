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


	// Get the date range
	const mostRecent = new Date(Math.max(...timeline.timeline.map(book => book.timestamp)));
	const oldest = new Date(Math.min(...timeline.timeline.map(book => book.timestamp)));

	const formatDate = (date: any) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			year: 'numeric'
		});
	};

	const handleShowMore = () => {
		setDisplayLimit(timeline.timeline.length);
	};

	const MAX_TAGS = 8;

	return (
		<Section
			title={
				<div className="font-rubik">
					Borrowed from <GradientText>Denver Public Library</GradientText>
				</div>
			}
		>
			<div className="flex flex-col gap-6 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md p-6">


				{/* Timeline */}
				<div className="mt-6">
					<h4 className="text-lg font-semibold text-white mb-4">
						Reading History ({formatDate(oldest)} - {formatDate(mostRecent)})
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{timeline.timeline.slice(0, displayLimit).map((book, index) => (
							<div key={index} className="flex flex-col bg-slate-700 rounded-lg overflow-hidden">
								{/* Book cover - portrait mode with 3:2 aspect ratio */}
								<div className="w-full relative" style={{ paddingBottom: '150%' }}>
									<div
										className="absolute inset-0 bg-cover bg-center"
										style={{
											backgroundColor: book.cover.color,
											backgroundImage: `url(${book.cover.url})`,
										}}
									/>
								</div>
								{/* Book details */}
								<div className="p-4">
									<h4 className="font-semibold text-white mb-1 line-clamp-2">{book.title.text}</h4>
									<p className="text-sm text-gray-300 mb-2 line-clamp-1">{book.author}</p>

									{/* Format and date */}
									<div className="flex items-center gap-2 mb-2">
										<span className={`text-xs px-2 py-1 rounded ${book.cover.format === 'ebook'
											? 'bg-purple-800 text-white'
											: 'bg-benhammondgreen-600 text-white'
											}`}>
											{book.cover.format}
										</span>
										<span className="text-xs text-gray-300">
											{formatDate(book.timestamp)}
										</span>
									</div>

									{/* Subject tags with limit */}
									{book.subjects && book.subjects.length > 0 && (
										<div className="flex flex-wrap gap-1 mt-2">
											{book.subjects.slice(0, MAX_TAGS).filter((book) => !/\d/.test(book)).map((subject, index) => (
												<span
													key={index}
													className="text-xs px-2 py-1 bg-slate-600 text-gray-300 rounded-full"
												>
													{/* render subject with all : _ and = stripped out,  */}
													{/* filter out any that contain numbers */}
													{subject.replace(/[:=_]/g, ' ').toLowerCase()}

													{/* {subject.replace(/[:=_]/g, ' ').toLowerCase()} */}
												</span>
											))}

										</div>
									)}
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
