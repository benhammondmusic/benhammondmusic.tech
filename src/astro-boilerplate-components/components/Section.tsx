import type { ReactNode } from 'react'

type ISectionProps = {
	title?: ReactNode
	children: ReactNode
}

const Section = (props: ISectionProps) => (
	<div className='mx-auto max-w-screen-lg px-3 py-6'>
		{props.title && (
			<h2 className='mb-2 text-2xl font-bold'>{props.title}</h2>
		)}

		{props.children}
	</div>
)

export { Section }
