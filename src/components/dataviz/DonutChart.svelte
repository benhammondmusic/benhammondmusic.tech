<script lang="ts">
	import { arc, interpolatePlasma, pie, quantize } from 'd3';
	import type { ValueCount } from '../../utils/songlistUtils';

	export let data: ValueCount[];

	const width = 1000;
	const height = width + 200;
	const strokeWidth = 0.1;
	const strokeLinejoin = 'round';
	const outerRadius = Math.min(width, height) * 0.5 - 280;
	const innerRadius = 100;
	const labelPosition = 2;
	const labelRadius = innerRadius * labelPosition + outerRadius * 0.3;
	const stroke = innerRadius > 0 ? 'yellow' : 'white';
	const padAngle = 5 / outerRadius;
	const fontSize = 10;

	const x = data.length > 0 ? Object.keys(data[0])[0] : 'value';
	const y = data.length > 0 ? Object.keys(data[0])[1] : 'count';
	const xVals = data.map((el: any) => el[x]);
	const yVals = data.map((el: any) => Number(el[y]));
	const iVals = data.map((_el: any, i: any) => i);

	let colors: any[] = data.length > 0
		? quantize((t) => interpolatePlasma(t * 0.7 + 0.3), xVals.length)
		: [];

	$: selectedArtist = '';

	const wedges: any[] = pie()
		.padAngle(padAngle)
		.sort(null)
		.value((i) => yVals[i as number])(iVals);

	const arcPath = arc().innerRadius(innerRadius).outerRadius(outerRadius);
	const arcLabel = arc().innerRadius(labelRadius).outerRadius(labelRadius);

	function handleArtistClick(eTarget: EventTarget | null) {
		const targetEl = eTarget as HTMLElement;
		selectedArtist = targetEl.textContent ?? '';
	}
</script>

<b>{selectedArtist}</b>

<svg width="100%" viewBox="{-width / 2} {-height / 2} {width} {height}" style="max-width:2000px;height:auto;display:block;margin:0 auto">
	{#each wedges as wedge, i}
		{@const wedgeAngle = (wedge.startAngle + wedge.endAngle) / 2}
		<path
			fill={colors[i]}
			d={arcPath(wedge)}
			{stroke}
			stroke-width={strokeWidth}
			stroke-linejoin={strokeLinejoin}
		/>
		<g
			text-anchor={wedge.startAngle < Math.PI ? 'start' : 'end'}
			transform="translate({arcLabel.centroid(wedge)})"
		>
			<text
				role="button"
				tabindex="0"
				on:click={(e) => handleArtistClick(e.target)}
				on:keydown={(e) => handleArtistClick(e.target)}
				transform={wedge.startAngle < Math.PI
					? `rotate(${(wedgeAngle / 2 / Math.PI) * 360 - 90})`
					: `rotate(${(wedgeAngle / 2 / Math.PI) * 360 + 90})`}
				font-size={yVals[i] / 1.5 + fontSize}
				fill="white"
			>
				<tspan font-weight="bold">{xVals[i]}</tspan>
			</text>
		</g>
	{/each}
	<g fill="#fff" transform="matrix(.02 0 0 -.02 -75 25)"><path d="m2400 3685v-1165h60 60v1105 1105h28c27 0 31-9 401-927 205-511 377-932 382-937 5-6 9 413 9 987v997h-60-60l-2-689-3-690-204 507c-113 279-238 589-279 690l-74 182h-129-129z" /><path d="m3400 3744v-1105l-26 3c-26 3-44 46-395 918-203 503-373 924-378 935-6 13-10-343-10-977l-1-998h60 60l2 680 3 680 274-680 274-680h129 128v1165 1165h-60-60z" /><path d="m50 4781v-61h258c293 0 363-10 450-62 84-51 134-125 168-249 23-81 26-345 5-429-31-124-116-249-192-280-16-7-29-15-29-19s16-15 36-26c86-46 153-145 185-275 9-35 14-111 14-210 0-165-13-238-57-330-44-90-143-165-250-190-24-5-166-10-315-10h-273v-60-60h283c312 0 361 7 468 61 84 42 153 113 194 202 53 112 67 176 72 342 8 230-22 371-104 493l-42 63 35 49c86 120 118 263 111 494-5 182-24 268-82 371-36 65-120 152-175 180-109 56-125 59-452 63l-308 4z" /><path d="m1230 3680v-1160h485 485v60 60h-425-425v1040 1040h425 425v60 60h-485-485z" /><path d="m50 3680v-980h60 60v980 980h-60-60z" /><path d="m230 4186v-476h158c177 0 255 11 322 45 123 63 175 190 174 435 0 256-60 382-210 440-52 20-82 24-251 28l-193 4zm392 334c44-13 102-74 119-127 20-65 23-310 5-384-34-133-90-169-272-177l-124-5v352 351h118c64 0 133-5 154-10z" /><path d="m1420 4185v-475h390 390v60 60h-330-330v350 350h330 330v65 65h-390-390z" /><path d="m230 3175v-477l193 4c224 6 270 16 342 80 86 76 120 186 119 393 0 260-61 387-214 447-47 18-82 22-247 26l-193 4zm399 329c50-21 76-48 103-107 21-48 23-65 23-227 0-168-1-177-26-231-44-94-104-119-285-119h-94v357 356l121-7c70-4 137-13 158-22z" /><path d="m1420 3175v-475h390 390v60 60h-330-330v350 350l328 2 327 3 3 63 3 62h-391-390z" /></g>
	<g>
		<text font-size={18} fill="white" transform="matrix(1 0 0 1 -70 50)">artists with multiple songs</text>
		<text font-size={18} fill="white" transform="matrix(1 0 0 1 -70 65)">in my repertoire</text>
	</g>
</svg>
