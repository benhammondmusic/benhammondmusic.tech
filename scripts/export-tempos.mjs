import { MongoClient } from 'mongodb';
import { writeFileSync, mkdirSync } from 'fs';

const MONGODB_ATLAS_URL = 'mongodb+srv://benjaminhammond:REDACTED@cluster0.pezuhtt.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(MONGODB_ATLAS_URL);

try {
	await client.connect();
	console.log('Connected to MongoDB');

	const collection = client.db('bhm').collection('songlist');
	const songs = await collection.find({}, { projection: { id: 1, name: 1, tempo: 1, _id: 0 } }).toArray();

	console.log(`Found ${songs.length} songs`);

	// Build a map of Spotify track ID -> tempo
	const tempoMap = {};
	let withTempo = 0;
	for (const song of songs) {
		if (song.id && song.tempo) {
			tempoMap[song.id] = Math.round(song.tempo);
			withTempo++;
		}
	}
	console.log(`${withTempo} songs have tempo data`);

	mkdirSync('src/assets/data', { recursive: true });
	writeFileSync('src/assets/data/song-tempos.json', JSON.stringify(tempoMap, null, 2));
	console.log('Written to src/assets/data/song-tempos.json');
} finally {
	await client.close();
}
