<script lang="ts">
	import {
		getAvgPopularity,
		getMostRepresentedEra,
		getUniqueArtistCount,
		type Song,
	} from '../../utils/songlistUtils';

	export let data: Song[];
</script>

<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
	<div class="bg-slate-700 rounded-lg p-4 text-center">
		<div class="text-3xl font-bold text-benhammondyellow">{data.length}</div>
		<div class="text-white/60 text-sm mt-1">songs in repertoire</div>
	</div>
	<div class="bg-slate-700 rounded-lg p-4 text-center">
		<div class="text-3xl font-bold text-benhammondyellow">{getUniqueArtistCount(data)}</div>
		<div class="text-white/60 text-sm mt-1">unique artists</div>
	</div>
	<div class="bg-slate-700 rounded-lg p-4 text-center">
		<div class="text-3xl font-bold text-benhammondyellow">{getAvgPopularity(data)}</div>
		<div class="text-white/60 text-sm mt-1">avg Spotify popularity</div>
	</div>
	<div class="bg-slate-700 rounded-lg p-4 text-center">
		<div class="text-xl font-bold text-benhammondyellow leading-tight mt-1">{getMostRepresentedEra(data)}</div>
		<div class="text-white/60 text-sm mt-1">most represented era</div>
	</div>
</div>
