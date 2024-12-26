import HET from '../assets/images/het.svg'
import {
	ColorTags,
	GradientText,
	Project,
	Section,
	Tags,
} from '../astro-boilerplate-components'

export const prerender = true

export default function CurrentProject() {
	return (

		<Section
			title={
				<p className='font-rubik'>
					Currently:
					<br />
					<GradientText>Sr. Software Engineer (Team Lead)</GradientText>
				</p>
			}
		>
			<div className='flex flex-col gap-6'>
				<Project
					name='HET'
					summary='Health Equity Tracker'
					description='Free-to-use data visualization platform enabling new insights into the impact of COVID-19 and other social and political determinants of health on historically underrepresented groups in the US; built collaboratively by Google.org and continuously expanded by the Satcher Health Leadership Institute'
					descriptionList={
						<ul className='list-inside list-disc'>
							<li>
								Ownership of Health Equity Tracker frontend, coordinating MVP
								hand-off from Google.org to our small team and continuing
								development into an award-winning platform.
							</li>
							<li>
								Personally achieved: 90% reduction in dataset transfer sizes by
								adding gzip Express middleware, 85% improvement on bundle sizes
								by code-splitting and lazy-loading React components, and another
								84% reduction in data shipped on our slowest reports (100%
								faster load times) by refactoring Airflow DAGs, setting
								permissions with Terraform and using SQL to query and export
								dramatically smaller JSON files.
							</li>
							<li>
								Personally quadrupled the number of trackable data types,
								completing research and writing new Python modules that process
								datasets across disparate sources using Pandas; Docker to
								containerize and upload for execution on GCP Cloud Run /
								BigQuery.
							</li>
							<li>
								Addressed over 170 accessibility audit items, adding
								screen-reader navigation to our Vega and D3 visualizations and
								making open-source contributions to NPM packages that improved
								usability for hundreds of thousands of users
							</li>
							<li>
								Architected an integrated blog and content management system,
								utilizing a headless Wordpress dashboard and incorporating
								content directly using React Query persisted via local storage.
							</li>
							<li>
								Representing our organization in communications with NPR, CDC,
								Rutgers and Robert Wood Johnson Foundation; collaboration with
								outside agencies to allow for problem-free insertion of newly
								designed components.
							</li>
							<li>
								Created a design system and standardized styling system,
								refactoring an inconsistent mix of Sass modules, Material UI,
								and inline styles into a custom Tailwind theme using a design
								token library. Included expanded tests with all new
								functionality; identified the lack of “end to end” testing and
								implemented coverage using Playwright running on CI and against
								production, added missing Typescript custom typing to expedite
								development and prevent errors.
							</li>
						</ul>
					}
					deployLink='https://healthequitytracker.org'
					repoLink='https://github.com/SatcherInstitute/health-equity-tracker'
					img={{
						src: HET.src,
						alt: 'Health Equity Tracker Project',
					}}
					category={
						<>
							<Tags color={ColorTags.EMERALD}>Python</Tags>
							<Tags color={ColorTags.EMERALD}>Pandas</Tags>
							<Tags color={ColorTags.EMERALD}>Pytest</Tags>
							<Tags color={ColorTags.EMERALD}>Docker</Tags>
							<Tags color={ColorTags.EMERALD}>Terraform</Tags>
							<Tags color={ColorTags.EMERALD}>GitHub Actions</Tags>
							<Tags color={ColorTags.EMERALD}>GCP</Tags>
							<Tags color={ColorTags.EMERALD}>Airflow</Tags>
							<Tags color={ColorTags.EMERALD}>BigQuery</Tags>
							<Tags color={ColorTags.EMERALD}>React</Tags>
							<Tags color={ColorTags.EMERALD}>TypeScript</Tags>
							<Tags color={ColorTags.EMERALD}>Vitest</Tags>
							<Tags color={ColorTags.EMERALD}>Playwright</Tags>
							<Tags color={ColorTags.EMERALD}>MUI</Tags>
							<Tags color={ColorTags.EMERALD}>Tailwind</Tags>
							<Tags color={ColorTags.EMERALD}>Vega</Tags>
							<Tags color={ColorTags.EMERALD}>D3</Tags>
							<Tags color={ColorTags.EMERALD}>Pre-Commit</Tags>
							<Tags color={ColorTags.EMERALD}>Biome</Tags>
						</>
					}
				/>
			</div>
		</Section>

	)
}

