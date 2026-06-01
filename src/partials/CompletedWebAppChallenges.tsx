import GigUploader from 'src/assets/images/gig-uploader.png'
import GigBoard from 'src/assets/images/gigboard.png'
import Tanks from 'src/assets/images/tanks.png'

import {
	ColorTags,
	GradientText,
	Section,
	Tags,
} from '../astro-boilerplate-components'
import { CompletedWebApp } from '@/astro-boilerplate-components/components/CompletedWebApp'



const CompletedWebAppChallenges = () => (
	<>
		<Section
			title={
				<div className='font-rubik'>
					Earlier <GradientText>Work</GradientText>
				</div>
			}
		>
			<div className='flex flex-col gap-6 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md p-6'>
				<CompletedWebApp
					name='GigBoard'
					description='MERN stack web app connecting gig-workers'
					descriptionList={
						<ul className='list-square'>
							<li>
								MVC design with internal RESTful API; CRUD permissions per user role with Google OAuth login.
							</li>
							<li>
								Project-managed a team of 6 using GitHub's agile board; contributed across the full stack including React components, dynamic search, and JWT auth.
							</li>
						</ul>
					}
					blogLink='/blog/connecting-frontend-backend-mongodb'
					repoLink='https://github.com/benhammondmusic/gigboard'
					img={{
						src: GigBoard.src,
						alt: 'GigBoard Project',
					}}
					category={
						<>
							<Tags color={ColorTags.VIOLET}>Node</Tags>
							<Tags color={ColorTags.VIOLET}>MongoDB</Tags>
							<Tags color={ColorTags.VIOLET}>Express</Tags>
							<Tags color={ColorTags.VIOLET}>JavaScript</Tags>
							<Tags color={ColorTags.VIOLET}>React</Tags>
						</>
					}
				/>
				<CompletedWebApp
					name='Tanks!'
					description='Classic terrain physics strategy game; built in 1 week with Canvas'
					descriptionList={
						<ul className='list-square'>
							<li>
								Procedurally generated terrain, collision detection, gravity, and scalable multiplayer mode.
							</li>
						</ul>
					}
					deployLink='https://tanks-js.netlify.app/'
					blogLink='/blog/tanks-game'
					repoLink='https://github.com/benhammondmusic/tanks'
					img={{ src: Tanks.src, alt: 'Tanks Game Project' }}
					category={
						<>
							<Tags color={ColorTags.ORANGE}>HTML Canvas</Tags>
							<Tags color={ColorTags.ORANGE}>JavaScript</Tags>
						</>
					}
				/>
				<CompletedWebApp
					name='Gig Uploader'
					description='Music promotion automation via web scraping'
					descriptionList={
						<ul className='list-square'>
							<li>
								Reads a local spreadsheet and programmatically submits gig listings to multiple platforms, propagating to Spotify, Google Calendar, and others.
							</li>
						</ul>
					}
					blogLink='/blog/giguploader'
					repoLink='https://github.com/benhammondmusic/giguploader'
					img={{
						src: GigUploader.src,
						alt: 'Gig Uploader Project',
					}}
					category={
						<>
							<Tags color={ColorTags.SLATE}>Python</Tags>
							<Tags color={ColorTags.SLATE}>Selenium</Tags>
							<Tags color={ColorTags.SLATE}>BeautifulSoup</Tags>
						</>
					}
				/>
			</div>
		</Section>
	</>
)

export { CompletedWebAppChallenges }
