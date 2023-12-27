
/**
 * Processes the lyrics by redacting vowels and replacing them with symbols.
 *
 * @param {string} lyrics - The lyrics to be processed.
 * @returns {Object} An object containing the original lyrics and the redacted lyrics.
 */
function processLyrics(lyrics) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const symbols = ['@', '€', '|', '*'];

  const redactedLyrics = lyrics.replace(/(?<=^|\n\S+ \S+|\s\S+ )([^aeiou\s]+[aeiou])|([aeiou])(?=\S+ \S+|\s\S+|$)/g, (match, group1, group2) => {
    if (group1) {
      const firstChar = group1.trim()[0];
      return (firstChar === '#' || firstChar === '|') ? match : group1; // Skip mutation if the line starts with '#' or '|'
    } else {
      const firstChar = group2.trim()[0];
      if (firstChar === '#' || firstChar === '|') {
        return group2; // Skip mutation if the line starts with '#' or '|'
      } else {
        const vowelIndex = vowels.indexOf(group2);
        return symbols[vowelIndex]; // Mutate group2 with corresponding symbol
      }
    }
  });

  return {
    originalLyrics: lyrics,
    redactedLyrics: redactedLyrics,
  };
}

export async function handler(event) {
  try {
    // Parse the incoming JSON from the POST request
    const requestBody = JSON.parse(event.body);

    // Ensure the "lyrics" key is present in the JSON
    if (!requestBody.lyrics) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing "lyrics" key in the request JSON' }),
      };
    }

    const lyrics = requestBody.lyrics;

    // Process the lyrics
    const result = processLyrics(lyrics);

    // Return the JSON response
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
