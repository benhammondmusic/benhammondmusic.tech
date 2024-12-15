import { useEffect, useState } from "react";
import { GradientText, Section } from "@/astro-boilerplate-components";

type textItem = {
  text: string;
  url: string;
};

function BlueskyStuff() {
  const [blueskyFeedTexts, setBlueskyFeedTexts] = useState<textItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/bluesky-posts", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const textItems = await response.json();

        setBlueskyFeedTexts(textItems);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error("Fetch error details:", err);

      }
    };

    fetchPosts();
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {isLoading ? (
            <div>Loading Bluesky posts...</div>
          )  : (
            blueskyFeedTexts?.length > 0 && blueskyFeedTexts.map(({ text, url }, index) => {
							const textSnippet = text && text.length > 65 ? text.slice(0, 65) + '...' : text;
              return (
                <div
  key={index}
  className="p-4 bg-gray-100 rounded-lg flex flex-col justify-between h-full"
>
  <p className="text-sm text-black">{textSnippet ?? "🦋"}</p>
  <div className="text-xs text-gray-500 mt-2">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      @benhammondmusic.tech 🦋
    </a>
  </div>
</div>
              );
            })
          )}
        </div>
      </div>
    </Section>
  );
}

export { BlueskyStuff };
