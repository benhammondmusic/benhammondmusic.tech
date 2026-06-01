<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getArtistCounts,
		getGenreCounts,
		type Song,
	} from '../../utils/songlistUtils';
	import BubbleChart from './BubbleChart.svelte';
	import DonutChart from './DonutChart.svelte';
	import MetaDataTable from './MetaDataTable.svelte';
	import VerticalBarChart from './VerticalBarChart.svelte';

	let songs: Song[] | null = null;
	let error: string | null = null;

	onMount(async () => {
		try {
			const res = await fetch('/api/playlist');
			const json = await res.json();
			if (json.error) throw new Error(json.error);
			songs = json.data;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load playlist data';
		}
	});
</script>

{#if error}
	<p class="text-red-400 text-center py-10">{error}</p>
{:else if songs === null}
	<div class="flex flex-col items-center gap-4 py-16 text-white/60">
		<div class="w-12 h-12 border-4 border-benhammondblue-300 border-t-benhammondyellow rounded-full animate-spin"></div>
		<p>Loading playlist data from Spotify...</p>
	</div>
{:else}
	<div class="flex flex-col gap-10">
		<section>
			<h3 class="text-lg font-semibold text-white mb-3">Tempo Distribution</h3>
			<p class="text-white/60 text-sm mb-4">
				How fast are the songs Ben plays? Bars pulse at their actual tempo.
			</p>
			<VerticalBarChart {songs} />
		</section>

		<section>
			<h3 class="text-lg font-semibold text-white mb-3">At a Glance</h3>
			<MetaDataTable data={songs} />
		</section>

		{#if getArtistCounts(songs).length > 0}
			<section>
				<h3 class="text-lg font-semibold text-white mb-3">Artists in the Repertoire</h3>
				<p class="text-white/60 text-sm mb-4">Artists with more than one song in Ben's setlist.</p>
				<DonutChart data={getArtistCounts(songs)} />
			</section>
		{/if}

		{#if getGenreCounts(songs).length > 0}
			<section>
				<h3 class="text-lg font-semibold text-white mb-3">Genre Bubbles</h3>
				<p class="text-white/60 text-sm mb-4">Spotify genre tags across the full repertoire.</p>
				<BubbleChart data={getGenreCounts(songs)} />
			</section>
		{/if}
	</div>
{/if}
