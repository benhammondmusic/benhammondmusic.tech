<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3';
	import {
		getDurationFromBpm,
		getTempoDistributions,
		roundNearestIncrementOfN,
		tempoMarkings,
		type Song,
	} from '../../utils/songlistUtils';

	export let songs: Song[];

	const colors = [
		'#336699', '#5b64a0', '#815f9e', '#a15a94',
		'#ba5681', '#ca5769', '#ce614f', '#c87136',
	];

	$: data = getTempoDistributions(songs);
	$: xVals = tempoMarkings.map((row) => row[1]);
	$: yVals = tempoMarkings.map((row) => data[row[1]] ?? 0);

	let innerWidth = window.innerWidth;
	$: vizWidth = Math.max(innerWidth - 100, 300);
	const vizHeight = 340;

	const marginTop = 20;
	const marginRight = 20;
	const marginBottom = 60;
	const marginLeft = 50;

	$: xRange = [marginLeft, vizWidth - marginRight];
	const yRange = [vizHeight - marginBottom, marginTop];

	$: xScale = scaleBand(xVals, xRange).padding(0.15);
	$: yMax = Math.max(...yVals, 1);
	$: yScale = scaleLinear([0, yMax], yRange).nice();
	$: yTicks = yScale.ticks(4);
</script>

<svelte:window bind:innerWidth />

<div class="overflow-x-auto">
	<svg width={vizWidth} height={vizHeight} viewBox="0 0 {vizWidth} {vizHeight}">
		<!-- Y grid + labels -->
		<g transform="translate({marginLeft}, 0)">
			{#each yTicks as tick}
				<g transform="translate(0, {yScale(tick)})">
					<line x2={vizWidth - marginLeft - marginRight} stroke="white" stroke-opacity="0.15" />
					<text x="-8" y="4" text-anchor="end" fill="white" font-size="11">{tick}</text>
				</g>
			{/each}
		</g>

		<!-- Bars -->
		{#each tempoMarkings as [, label], i}
			{@const x = xScale(label) ?? 0}
			{@const count = yVals[i] ?? 0}
			{@const barH = yScale(0) - yScale(count)}
			{@const avgBpm = i > 0
				? (tempoMarkings[i - 1][0] + tempoMarkings[i][0]) / 2
				: tempoMarkings[i][0]}
			<rect
				class="bar {label}"
				x={x}
				y={yScale(count)}
				width={xScale.bandwidth()}
				height={barH}
				fill={colors[i % colors.length]}
				rx="3"
				style="animation-duration: {getDurationFromBpm(avgBpm)}s"
			/>
			<!-- Count above bar -->
			{#if count > 0}
				<text
					x={x + xScale.bandwidth() / 2}
					y={yScale(count) - 4}
					text-anchor="middle"
					fill="white"
					font-size="12"
				>{count}</text>
			{/if}
			<!-- BPM label -->
			<text
				x={x + xScale.bandwidth() / 2}
				y={vizHeight - marginBottom + 14}
				text-anchor="middle"
				fill="white/60"
				font-size="10"
				fill-opacity="0.6"
			>{i === 0 ? '<' : '~'}{roundNearestIncrementOfN(avgBpm)} bpm</text>
			<!-- Tempo name -->
			<text
				x={x + xScale.bandwidth() / 2}
				y={vizHeight - marginBottom + 28}
				text-anchor="middle"
				fill="white"
				font-size={innerWidth < 500 ? '9' : '11'}
			>{label}</text>
		{/each}

		<!-- X axis line -->
		<line
			x1={marginLeft}
			y1={vizHeight - marginBottom}
			x2={vizWidth - marginRight}
			y2={vizHeight - marginBottom}
			stroke="white"
			stroke-opacity="0.3"
		/>
	</svg>
</div>

<style>
	.bar { will-change: transform; transform-origin: bottom; }
	.bar.Lento       { animation: pulse 1.5s ease-in-out infinite; }
	.bar.Adagio      { animation: pulse 0.98s ease-in-out infinite; }
	.bar.Andante     { animation: pulse 0.76s ease-in-out infinite; }
	.bar.Moderato    { animation: pulse 0.62s ease-in-out infinite; }
	.bar.Allegro     { animation: pulse 0.5s ease-in-out infinite; }
	.bar.Vivace      { animation: pulse 0.43s ease-in-out infinite; }
	.bar.Presto      { animation: pulse 0.36s ease-in-out infinite; }
	.bar.Prestissimo { animation: pulse 0.3s ease-in-out infinite; }

	@keyframes pulse {
		0%, 100% { transform: scaleY(0.93); transform-origin: bottom; }
		50%       { transform: scaleY(1);    transform-origin: bottom; }
	}
</style>
