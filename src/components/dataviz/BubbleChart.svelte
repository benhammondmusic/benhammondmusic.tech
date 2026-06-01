<script lang="ts">
	import { InternSet, hierarchy, pack, range, scaleOrdinal, schemeTableau10 } from 'd3';
	import type { ValueCount } from '../../utils/songlistUtils';

	export let data: ValueCount[];

	const width = 700;
	const padding = 3;
	const margin = 1;
	const textColor = 'black';
	const fill = '#ccc';
	const fillOpacity = 0.9;
	const strokeColor = 'none';
	const strokeWidth = 1;
	const strokeOpacity = 1;
	const height = width;
	const marginLeft = margin;
	const marginRight = margin;
	const marginTop = margin;
	const marginBottom = margin;

	const dVals = data.map((el) => el);
	const vVals = data.map((el) => el.count);
	const gVals = dVals;
	const iVals = range(vVals.length).filter((i) => vVals[i] > 0);

	let groups = iVals.map((i) => gVals[i]);
	groups = new InternSet(groups);

	const colorScale = scaleOrdinal(groups, schemeTableau10);

	const lVals = data.map((el) =>
		[...el.value.split(/[\s-]+/), el.count.toLocaleString('en')].join('\n')
	);
	const tVals = data.map((el) => `${el.value}\n${el.count.toLocaleString('en')}`);

	const uid = `O-${Math.random().toString(16).slice(2)}`;

	const root = pack()
		.size([width - marginLeft - marginRight, height - marginTop - marginBottom])
		.padding(padding)(hierarchy({ children: iVals }).sum((i) => vVals[i]));
</script>

<svg viewBox="{-marginLeft} {-marginTop} {width} {height}" fill={textColor}>
	{#each root.leaves() as leaf, i}
		<g class="node" transform="translate({leaf.x},{leaf.y})">
			<circle
				id="node-{i}"
				stroke={strokeColor}
				stroke-width={strokeWidth}
				stroke-opacity={strokeOpacity}
				fill={gVals ? colorScale(gVals[leaf.data]) : fill == null ? 'none' : fill}
				fill-opacity={fillOpacity}
				r={leaf.r}
			>
				<title>{tVals[i]}</title>
			</circle>
			<clipPath id={`${uid}-clip-${leaf.data}`}>
				<circle r={leaf.r} />
			</clipPath>
			<text clip-path={`url(#${uid}-clip-${leaf.data})`}>
				{#each `${lVals[leaf.data]}`.split(/\n/g) as subtext, j}
					<tspan
						x="0"
						y={`${j - `${lVals[leaf.data]}`.split(/\n/g).length / 2 + 0.85}em`}
						fill-opacity={j === `${lVals[leaf.data]}`.split(/\n/g).length - 1 ? 0.7 : null}
						font-size={leaf.r * 0.3}
					>
						{subtext}
					</tspan>
				{/each}
			</text>
		</g>
	{/each}
</svg>

<style>
	svg {
		max-width: 100%;
		height: auto;
		font-size: 10px;
		text-anchor: middle;
	}
	.node:hover {
		font-weight: 700;
	}
</style>
