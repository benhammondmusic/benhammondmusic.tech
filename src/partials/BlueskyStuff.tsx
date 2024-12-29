import { GradientText, Section } from "@/astro-boilerplate-components";
import { fetchBlueskyStuff, getProfileLink } from "@/utils/bluesky";

export type textItem = {
	text: string;
	url: string;
	images?: Array<{
		alt: string;
		url: string;
	}>;
};

const blueskyResponse = await fetchBlueskyStuff();
const blueSkyItems: textItem[] = await blueskyResponse.json();

console.log(blueSkyItems);

function BlueskyStuff() {
	return (
		<Section
			title={
				<div className="font-rubik">
					Bluesky <GradientText>Stuff</GradientText>
				</div>
			}
		>
			<div className="flex flex-col gap-6 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md p-6">
				<div className="columns-1 md:columns-2 lg:columns-3 gap-4">
					{blueSkyItems?.length > 0 &&
						blueSkyItems.map(({ text, url, images }, index) => (
							<a
								key={index + "-" + text}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="group block mb-4 break-inside-avoid"
							>
								<div className="p-4 bg-gray-100 rounded-lg relative hover:translate-y-1 focus:translate-y-1 transform transition">
									{/* Images first - if present */}
									{images && images.length > 0 && (
										<div className="space-y-2 mb-3">
											{images.map((img, i) => (
												<div key={i} className="relative w-full">
													<img
														src={img.url}
														alt={img.alt}
														className="w-full h-auto rounded-md"
													/>
												</div>
											))}
										</div>
									)}

									{/* Text below images */}
									<p className="text-sm text-black">
										{text && text.length > 120
											? text.slice(0, 120) + "..."
											: text ?? "🦋"}
									</p>
								</div>
							</a>
						))}
				</div>

				<div className="flex justify-end text-xs text-white">
					<a
						href={getProfileLink()}
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
};

export { BlueskyStuff };