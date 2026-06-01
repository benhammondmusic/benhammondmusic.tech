export interface Artist {
	name: string;
	id: string;
	genres: string[];
}

export interface Album {
	release_date: string;
}

export interface Song {
	name: string;
	popularity: number;
	era: string;
	tempo: number | null;
	artists: Artist[];
	album: Album;
}

export const tempoMarkings: [number, string][] = [
	[50, 'Lento'], [73, 'Adagio'], [86, 'Andante'], [109, 'Moderato'],
	[132, 'Allegro'], [150, 'Vivace'], [180, 'Presto'], [220, 'Prestissimo'],
];

export function getTempoBucket(tempo: number): string {
	for (const [maxTempo, bucket] of tempoMarkings) {
		if (tempo <= maxTempo) return bucket;
	}
	return 'Prestissimo';
}

export function getTempoDistributions(songs: Song[]): Record<string, number> {
	const distributions: Record<string, number> = {};
	for (const song of songs) {
		if (song.tempo === null) continue;
		const bucket = getTempoBucket(song.tempo);
		distributions[bucket] = (distributions[bucket] ?? 0) + 1;
	}
	return distributions;
}

export function getDurationFromBpm(bpm: number): number {
	return 60 / bpm;
}

export function roundNearestIncrementOfN(x: number, n = 5): number {
	return Math.ceil(x / n) * n;
}

export type ValueCount = {
	value: string;
	count: number;
};

export const ERA_ORDER = [
	'Early 20th Century', "60's", "70's", "80's", "90's", "2000's", "2010's and Today"
];

export function getEra(release_date: string): string {
	const year = parseInt(release_date.substring(0, 4));
	if (year < 1960) return 'Early 20th Century';
	if (year < 1970) return "60's";
	if (year < 1980) return "70's";
	if (year < 1990) return "80's";
	if (year < 2000) return "90's";
	if (year < 2010) return "2000's";
	return "2010's and Today";
}

export function getEraCounts(data: Song[]): ValueCount[] {
	const counts: Record<string, number> = {};
	for (const song of data) {
		counts[song.era] = (counts[song.era] ?? 0) + 1;
	}
	return ERA_ORDER
		.filter((era) => (counts[era] ?? 0) > 0)
		.map((era) => ({ value: era, count: counts[era] ?? 0 }));
}

export function getAvgPopularity(data: Song[]): number {
	if (data.length === 0) return 0;
	return Math.round(data.reduce((sum, s) => sum + s.popularity, 0) / data.length);
}

export function getMostRepresentedEra(data: Song[]): string {
	const counts = getEraCounts(data);
	return counts.sort((a, b) => b.count - a.count)[0]?.value ?? 'Unknown';
}

export function getUniqueArtistCount(data: Song[]): number {
	return new Set(data.flatMap((s) => s.artists.map((a) => a.name))).size;
}

function getAllArtists(data: Song[]) {
	return data
		.flatMap((song) => song.artists.map((artist) => artist.name))
		.map((artist) => artist.split(' And The ')[0] ?? artist);
}

export function getArtistCounts(data: Song[]): ValueCount[] {
	const valueCounts: ValueCount[] = [];
	getAllArtists(data).forEach((artist) => {
		const found = valueCounts.find((vc) => vc.value === artist);
		if (found) { found.count += 1; }
		else { valueCounts.push({ value: artist, count: 1 }); }
	});
	return valueCounts.filter((vc) => vc.count > 1).sort((a, b) => b.count - a.count);
}

export function getGenreCounts(data: Song[]): ValueCount[] {
	const allGenres = data.flatMap((song) => song.artists).flatMap((artist) => artist.genres);
	const valueCounts: ValueCount[] = [];
	allGenres.forEach((genre) => {
		const found = valueCounts.find((vc) => vc.value === genre);
		if (found) { found.count += 1; }
		else { valueCounts.push({ value: genre, count: 1 }); }
	});
	return valueCounts.filter((vc) => vc.count > 1).sort((a, b) => b.count - a.count);
}
