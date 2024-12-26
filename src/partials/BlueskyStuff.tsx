import { GradientText, Section } from "@/astro-boilerplate-components";
import { fetchBlueskyStuff, getProfileLink } from "@/utils/bluesky";


type textItem = {
	text: string;
	url: string;
};

// Data fetching
const blueskyResponse = await fetchBlueskyStuff();
const blueSkyTextItems: textItem[] = await blueskyResponse.json();



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
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					{
						blueSkyTextItems?.length > 0 && blueSkyTextItems.map(({ text, url }, index) => {
							const textSnippet = text && text.length > 65 ? text.slice(0, 65) + '...' : text;
							return (
								<a
									key={index + "-" + textSnippet}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className=""
								>
									<div

										className="p-4 bg-gray-100 rounded-lg relative hover:translate-y-1 focus:translate-y-1 transform transition"
									>
										<p className="text-sm text-black">{textSnippet ?? "🦋"}</p>

									</div>
								</a>
							);
						})
					}
				</div>
				<div className="flex justify-end text-xs text-white ">
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
}

export { BlueskyStuff };
