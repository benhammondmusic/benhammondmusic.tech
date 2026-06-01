<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3';
	import { ERA_ORDER, getEraCounts, type Song } from '../../utils/songlistUtils';

	export let songs: Song[];

	const colors = [
		'#336699', '#5b64a0', '#815f9e', '#a15a94',
		'#ba5681', '#ca5769', '#ce614f', '#c87136',
	];

	$: eraCounts = getEraCounts(songs);
	$: xVals = eraCounts.map((d) => d.value);
	$: yVals = eraCounts.map((d) => d.count);

	let innerWidth = window.innerWidth;
	$: vizWidth = Math.max(innerWidth - 100, 300);
	const vizHeight = 340;

	const marginTop = 20;
	const marginRight = 20;
	const marginBottom = 60;
	const marginLeft = 50;

	$: xRange = [marginLeft, vizWidth - marginRight];
	const yRange = [vizHeight - marginBottom, marginTop];

	$: xScale = scaleBand(xVals, xRange).padding(0.2);
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
		{#each eraCounts as d, i}
			{@const x = xScale(d.value) ?? 0}
			{@const barH = yScale(0) - yScale(d.count)}
			<rect
				x={x}
				y={yScale(d.count)}
				width={xScale.bandwidth()}
				height={barH}
				fill={colors[i % colors.length]}
				rx="3"
			/>
			<!-- Count label above bar -->
			<text
				x={x + xScale.bandwidth() / 2}
				y={yScale(d.count) - 4}
				text-anchor="middle"
				fill="white"
				font-size="12"
			>{d.count}</text>
			<!-- Era label below axis -->
			<text
				x={x + xScale.bandwidth() / 2}
				y={vizHeight - marginBottom + 16}
				text-anchor="middle"
				fill="white"
				font-size={innerWidth < 500 ? '9' : '11'}
			>{d.value}</text>
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
