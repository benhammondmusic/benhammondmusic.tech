import type { ReactNode } from 'react'
import { ExternalLinkWithArrow } from './CompletedWebApp'

type IProjectProps = {
	img: {
		src: string
		alt: string
	}
	name: string
	summary: string
	description?: string
	descriptionList?: ReactNode
	deployLink?: string
	blogLink?: string
	repoLink: string
	category: ReactNode
}

const Project = (props: IProjectProps) => {
	const link = props.deployLink ?? props.blogLink ?? props.repoLink

	return (
		<div className='flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-5 md:flex-row md:justify-center ring-1 ring-benhammondblue-50 ring-inset'>
			<div className='shrink-0 flex flex-col items-center'>
				<a href={link}>
					<img
						className='h-36 w-36 rounded hover:translate-y-1'
						src={props.img.src}
						alt={props.img.alt}
						loading='lazy'
					/>
				</a>
				<div className='mt-3 text-center md:font-semibold md:text-xl italic '>
					{props.name}
					<span className='md:hidden leading-loose'> — {props.summary}</span>
				</div>
			</div>

			<div className='w-11/12'>
				<div className='flex w-full flex-col items-center justify-between  gap-y-2 md:flex-row'>
					<h3 className='my-3 text-center text-xl font-semibold md:text-left hidden md:block'>
						{props.summary}
					</h3>
					<div className='mb-5 flex w-96 justify-center items-end text-right font-semibold md:flex-col lg:flex-none italic md:not-italic '>
						{props.blogLink && (

							<ExternalLinkWithArrow href={props.blogLink}>
								Blog Post
							</ExternalLinkWithArrow>
						)}
						{props.deployLink && (

							<ExternalLinkWithArrow href={props.deployLink}>
								View Site
							</ExternalLinkWithArrow>
						)}

						<ExternalLinkWithArrow href={props.repoLink}>
							GitHub Repo
						</ExternalLinkWithArrow>
					</div>
				</div>

				{props?.description && <p>{props.description}</p>}
				{props.descriptionList && (
					<details>
						<summary className='cursor-pointer py-3 font-semibold hover:text-benhammondyellow'>
							Role details
						</summary>
						{props.descriptionList}
					</details>
				)}
				<div className='mt-5 flex flex-wrap justify-center gap-2 md:justify-start'>
					{props.category}
				</div>
			</div>
		</div>
	)
}

export { Project }
