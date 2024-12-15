import { useEffect, useState } from "react";
import { GradientText, Section } from "@/astro-boilerplate-components";

type textItem = {
  text: string;
  url: string;
};

function BlueskyStuff() {
  const [blueskyFeedTexts, setBlueskyFeedTexts] = useState<textItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        if (!response.ok) {
          const text = await response.text();
          console.error("Response text:", text);
          throw new Error(
            `HTTP error! status: ${response.status}, text: ${text}`
          );
        }

        const textItems = await response.json();

        // const truncatedTexts = textItems.map((textItem: {text:string, url: string}) => textItem.text && textItem.text.length > 65 ? textItem.text.slice(0, 65) + '...' : textItem.text);

        setBlueskyFeedTexts(textItems);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error("Fetch error details:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
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
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            blueskyFeedTexts.map(({ text, url }, index) => {
							const textSnippet = text && text.length > 65 ? text.slice(0, 65) + '...' : text;
              return (
                <div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg relative"
                >
                  <p className="text-sm text-black">{textSnippet ?? "🦋"}</p>
                  <div className="absolute bottom-1 right-1 text-xs text-gray-500">
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
