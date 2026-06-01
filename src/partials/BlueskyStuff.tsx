import { useState, useEffect } from 'react';
import { GradientText, Section } from "@/astro-boilerplate-components";

type TextItem = {
	text: string;
	url: string;
	images?: Array<{ alt: string; url: string }>;
};

function BlueskyStuff() {
	const [items, setItems] = useState<TextItem[] | null>(null);

	useEffect(() => {
		fetch('/api/bluesky')
			.then(r => r.json())
			.then(setItems)
			.catch(() => setItems([]));
	}, []);

	return (
		<Section
			title={
				<div className="font-rubik">
					Bluesky <GradientText>Stuff</GradientText>
				</div>
			}
		>
			<div className="flex flex-col gap-6 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md p-6">
				{items === null ? (
					<div className="columns-1 md:columns-2 lg:columns-3 gap-4 animate-pulse">
						{[1, 2, 3, 4, 5].map(i => (
							<div key={i} className="mb-4 h-24 bg-white/10 rounded-lg" />
						))}
					</div>
				) : (
					<div className="columns-1 md:columns-2 lg:columns-3 gap-4">
						{items.map(({ text, url, images }, index) => (
							<a
								key={index + "-" + text}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="group block mb-4 break-inside-avoid"
							>
								<div className="p-4 bg-gray-100 rounded-lg relative hover:translate-y-1 focus:translate-y-1 transform transition">
									{images && images.length > 0 && (
										<div className="space-y-2 mb-3">
											{images.map((img, i) => (
												<div key={i} className="relative w-full">
													<img src={img.url} alt={img.alt} className="w-full h-auto rounded-md" />
												</div>
											))}
										</div>
									)}
									<p className="text-sm text-black">
										{text && text.length > 120 ? text.slice(0, 120) + "..." : text ?? "🦋"}
									</p>
								</div>
							</a>
						))}
					</div>
				)}

				<div className="flex justify-end text-xs text-white">
					<a
						href="https://bsky.app/profile/benhammondmusic.tech"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline hover:text-benhammondyellow"
					>
						@benhammondmusic.tech 🦋
					</a>
				</div>
			</div>
		</Section>
	);
}

export { BlueskyStuff };
