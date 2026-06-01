<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3';
	import {
		getDurationFromBpm,
		getTempoDistributions,
		tempoMarkings,
		type Song,
	} from '../../utils/songlistUtils';

	export let songs: Song[];

	const colors = [
		'#336699', '#5b64a0', '#815f9e', '#a15a94',
		'#ba5681', '#ca5769', '#ce614f', '#c87136',
	];

	function rangeLabel(i: number): string {
		if (i === 0) return `< ${tempoMarkings[0][0]} bpm`;
		if (i === tempoMarkings.length - 1) return `${tempoMarkings[i - 1][0]}+ bpm`;
		return `${tempoMarkings[i - 1][0]}-${tempoMarkings[i][0]} bpm`;
	}

	$: data = getTempoDistributions(songs);
	$: xVals = tempoMarkings.map((row) => row[1]);
	$: yVals = tempoMarkings.map((row) => data[row[1]] ?? 0);

	let innerWidth = window.innerWidth;
	$: mobile = innerWidth < 560;
	$: vizWidth = Math.max(innerWidth - 100, 300);
	$: marginBottom = mobile ? 72 : 52;
	const vizHeight = 360;
	const marginTop = 32;
	const marginRight = 20;
	const marginLeft = 44;

	$: xRange = [marginLeft, vizWidth - marginRight];
	$: yRange = [vizHeight - marginBottom, marginTop];
	$: xScale = scaleBand(xVals, xRange).padding(0.15);
	$: yMax = Math.max(...yVals, 1);
	$: yScale = scaleLinear([0, yMax], yRange).nice();
	$: yTicks = yScale.ticks(4);

	$: bw = xScale.bandwidth();
</script>

<svelte:window bind:innerWidth />

<div class="overflow-x-auto">
	<svg width={vizWidth} height={vizHeight} viewBox="0 0 {vizWidth} {vizHeight}">
		<!-- Y grid + labels -->
		<g transform="translate({marginLeft}, 0)">
			{#each yTicks as tick}
				<g transform="translate(0, {yScale(tick)})">
					<line x2={vizWidth - marginLeft - marginRight} stroke="white" stroke-opacity="0.12" />
					<text x="-6" y="4" text-anchor="end" fill="white" fill-opacity="0.5" font-size="10">{tick}</text>
				</g>
			{/each}
		</g>

		<!-- X axis line -->
		<line
			x1={marginLeft} y1={vizHeight - marginBottom}
			x2={vizWidth - marginRight} y2={vizHeight - marginBottom}
			stroke="white" stroke-opacity="0.25"
		/>

		<!-- Bars + labels -->
		{#each tempoMarkings as [maxBpm, label], i}
			{@const x = xScale(label) ?? 0}
			{@const cx = x + bw / 2}
			{@const count = yVals[i] ?? 0}
			{@const barTop = yScale(count)}
			{@const barH = yScale(0) - barTop}
			{@const avgBpm = i > 0 ? (tempoMarkings[i - 1][0] + maxBpm) / 2 : maxBpm / 2}

			<!-- Bar -->
			<rect
				class="bar {label}"
				{x} y={barTop}
				width={bw} height={barH}
				fill={colors[i % colors.length]}
				rx="3"
				style="animation-duration: {getDurationFromBpm(avgBpm)}s"
			/>

			<!-- Tempo range on top of bar -->
			<text
				x={cx}
				y={barTop - 6}
				text-anchor="middle"
				fill="white"
				fill-opacity="0.85"
				font-size={mobile ? '8' : '10'}
			>{rangeLabel(i)}</text>

			<!-- Song count inside bar (only if bar is tall enough) -->
			{#if count > 0 && barH > 20}
				<text
					x={cx}
					y={barTop + Math.min(barH / 2 + 5, barH - 5)}
					text-anchor="middle"
					fill="white"
					font-size={mobile ? '10' : '13'}
					font-weight="600"
				>{count}</text>
			{/if}

			<!-- Tempo name below axis, rotated on mobile -->
			<text
				x={cx}
				y={vizHeight - marginBottom + (mobile ? 10 : 18)}
				text-anchor={mobile ? 'end' : 'middle'}
				fill="white"
				font-size={mobile ? '9' : '11'}
				transform={mobile
					? `rotate(-45, ${cx}, ${vizHeight - marginBottom + 10})`
					: null}
			>{label}</text>
		{/each}
	</svg>
</div>

<style>
	.bar { will-change: transform; transform-origin: bottom; }
	.bar.Lento       { animation: pulse 1.5s  ease-in-out infinite; }
	.bar.Adagio      { animation: pulse 0.98s ease-in-out infinite; }
	.bar.Andante     { animation: pulse 0.76s ease-in-out infinite; }
	.bar.Moderato    { animation: pulse 0.62s ease-in-out infinite; }
	.bar.Allegro     { animation: pulse 0.5s  ease-in-out infinite; }
	.bar.Vivace      { animation: pulse 0.43s ease-in-out infinite; }
	.bar.Presto      { animation: pulse 0.36s ease-in-out infinite; }
	.bar.Prestissimo { animation: pulse 0.3s  ease-in-out infinite; }

	@keyframes pulse {
		0%, 100% { transform: scaleY(0.93); transform-origin: bottom; }
		50%       { transform: scaleY(1);    transform-origin: bottom; }
	}
</style>
