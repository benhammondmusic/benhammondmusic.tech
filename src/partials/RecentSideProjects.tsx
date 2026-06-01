

import {
	ColorTags,
	GradientText,
	Project,
	Section,
	Tags,
} from '../astro-boilerplate-components'



export default function RecentSideProjects(props: any) {

	const {
		BenHammondTechPicture,
		BenHammondMusicPicture,
		DataVizPicture,
		MyDenverCardFreePicture,
	} = props

	return (

		<Section
			title={
				<div className='font-rubik'>
					Ongoing <GradientText>Side Projects</GradientText>
				</div>
			}
		>
			<div className='flex flex-col gap-6'>
				<Project
					name='Dev Portfolio'
					summary='benhammondmusic.tech'
					description='My web dev and software engineering online presence. Built with Astro and React islands for real-time client-side hydration; live GitHub activity, recent blog posts, and library reading history all fetched at runtime via Netlify Functions.'
					deployLink='https://benhammondmusic.tech'
					repoLink='https://github.com/benhammondmusic/benhammondmusic.tech'
					projectImage={BenHammondTechPicture}
					category={
						<>
							<Tags color={ColorTags.SKY}>Astro</Tags>
							<Tags color={ColorTags.SKY}>React</Tags>
							<Tags color={ColorTags.SKY}>TypeScript</Tags>
							<Tags color={ColorTags.SKY}>Tailwind</Tags>
							<Tags color={ColorTags.SKY}>GraphQL</Tags>
						</>
					}
				/>
				<Project
					name='Music Site'
					summary='benhammondmusic.com'
					description='Refactored my professional music site to incorporate modern web best-practices and allow seamless CI/CD with Netlify and GitHub; filterable song search for improved user experience.
					'
					deployLink='https://benhammondmusic.com'
					repoLink='https://github.com/benhammondmusic/benhammondmusic.com'
					projectImage={BenHammondMusicPicture}
					category={
						<>
							<Tags color={ColorTags.RED}>SvelteKit</Tags>
							<Tags color={ColorTags.RED}>TypeScript</Tags>
							<Tags color={ColorTags.RED}>Tailwind</Tags>
						</>
					}
				/>
				<Project
					name='Data Viz'
					summary='Music Career Visualization Playground'
					description='Visualizing the metadata behind my music career: tempo distribution, key signatures, danceability, genre bubbles, and more. Spotify playlist data fetched via API, cached in Upstash Redis, and rendered with D3 and Svelte islands.'
					deployLink='/playground'
					repoLink='https://github.com/benhammondmusic/benhammondmusic.tech'
					projectImage={DataVizPicture}
					category={
						<>
							<Tags color={ColorTags.AMBER}>Svelte</Tags>
							<Tags color={ColorTags.AMBER}>TypeScript</Tags>
							<Tags color={ColorTags.AMBER}>Redis</Tags>
							<Tags color={ColorTags.AMBER}>D3</Tags>
							<Tags color={ColorTags.AMBER}>Spotify API</Tags>
						</>
					}
				/>
				<Project
					name='Community Site'
					summary='MyDenverCard Free'
					description='Auto-collects current and upcoming free events and activities for MyDenverCard holders and their parents. Scrapes and aggregates listings so families always know what free options are available this week.'
					deployLink='https://benhammondmusic.github.io/my-denver-card-free/'
					repoLink='https://github.com/benhammondmusic/my-denver-card-free'
					projectImage={MyDenverCardFreePicture}
					category={
						<>
							<Tags color={ColorTags.CYAN}>Go</Tags>
							<Tags color={ColorTags.CYAN}>Templ</Tags>
							<Tags color={ColorTags.CYAN}>GitHub Actions</Tags>
						</>
					}
				/>
			</div>
		</Section>
	)

}


