export const prerender = false;
import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';
import { getEra } from '@/utils/songlistUtils';
import tempoData from '@/assets/data/song-tempos.json';

const PLAYLIST_ID = '1BGI6ETmEsvhj0nTv7LOu6';
const CACHE_KEY = 'spotify:playlist';
const CACHE_TTL = 60 * 60 * 24; // 24 hours

async function getSpotifyToken(): Promise<string> {
	const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
	const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
	const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: clientId,
			client_secret: clientSecret,
		}),
	});

	const data = await res.json();
	if (!data.access_token) throw new Error(`Spotify token error: ${JSON.stringify(data)}`);
	return data.access_token;
}

async function fetchPlaylistData(token: string) {
	const headers = { Authorization: `Bearer ${token}` };
	const allSongs: any[] = [];

	let endpoint: string | null = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`;

	while (endpoint) {
		const playlistRes: any = await fetch(endpoint, { headers }).then((r) => r.json());

		if (!playlistRes.items) {
			console.error('Playlist response missing items:', JSON.stringify(playlistRes).slice(0, 300));
			break;
		}
		console.log(`Playlist page: ${playlistRes.items.length} tracks, next: ${!!playlistRes.next}`);

		// Artist details (genres) in batches of 50
		const artistIds = playlistRes.items
			.filter((item: any) => item.track)
			.flatMap((item: any) => item.track.artists.map((a: any) => a.id));

		const artistData: any[] = [];
		for (let i = 0; i < artistIds.length; i += 50) {
			const batch = artistIds.slice(i, i + 50);
			const artistRes = await fetch(
				`https://api.spotify.com/v1/artists?ids=${batch.join(',')}`,
				{ headers }
			).then((r) => r.json());
			artistData.push(...(artistRes.artists ?? []));
		}

		const songs = playlistRes.items
			.filter((item: any) => item.track?.id)
			.map((item: any) => {
				const { name, popularity, artists, album } = item.track;
				const tempo = (tempoData as Record<string, number>)[item.track.id] ?? null;
				return {
					name,
					popularity,
					era: getEra(album.release_date),
					tempo,
					artists: artists.map((artist: any) => ({
						name: artist.name,
						id: artist.id,
						genres: artistData.find((a: any) => a?.id === artist.id)?.genres ?? [],
					})),
					album,
				};
			});

		allSongs.push(...songs);
		endpoint = playlistRes.next ?? null;
	}

	return allSongs;
}

export const GET: APIRoute = async () => {
	const redis = new Redis({
		url: import.meta.env.UPSTASH_REDIS_REST_URL,
		token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
	});

	try {
		const cached = await redis.get<any[]>(CACHE_KEY);
		if (cached) {
			const count = Array.isArray(cached) ? cached.length : 'not-an-array';
			console.log(`Redis cache HIT: ${count} songs`);
			return new Response(JSON.stringify({ data: cached }), {
				headers: {
					'Content-Type': 'application/json',
					'X-Cache': 'HIT',
				},
			});
		}

		const token = await getSpotifyToken();
		const songs = await fetchPlaylistData(token);

		await redis.set(CACHE_KEY, songs, { ex: CACHE_TTL });

		return new Response(JSON.stringify({ data: songs }), {
			headers: {
				'Content-Type': 'application/json',
				'X-Cache': 'MISS',
			},
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error('Playlist fetch error:', message);
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
