import type { ReactNode } from 'react'

type ICompletedWebAppProps = {
  img: {
    src: string
    alt: string
  }
  name: string
  description?: string
  descriptionList?: ReactNode
  deployLink?: string
  blogLink?: string
  repoLink: string
  category: ReactNode
}

const CompletedWebApp = (props: ICompletedWebAppProps) => {
  return (
    <div className='flex flex-col-reverse items-center gap-x-8 rounded-md bg-benhammondblue-900 p-5 pb-1 md:flex-row w-full ring-1 ring-benhammondblue-600 ring-inset'>
      <div className='w-11/12'>
        <a
          className='hover:text-benhammondyellow'
          href={props.deployLink ?? props.blogLink ?? props.repoLink}
        >
          <span className='font-black'>{props.name}</span>
          {props?.description && <span>: {props.description}</span>}
        </a>
        <div className='mt-3 flex flex-wrap justify-center gap-1 md:justify-start'>
          {props.category}
        </div>
        {props.descriptionList && (
          <details className='py-3 text-sm '>
            <summary className='cursor-pointer  hover:text-benhammondyellow'>
              Details
            </summary>
            <div className='p-4 '>{props.descriptionList}</div>
          </details>
        )}
      </div>

      <div className='mb-5 flex w-96 justify-center text-right text-xs italic md:not-italic md:font-semibold md:flex-col lg:flex-none '>
        {props.blogLink && (
          <a
            className='mx-5 text-sm  hover:text-benhammondyellow md:mr-10 md:ml-0'
            href={props.blogLink}
          >
            Blog Post&#x2197;
          </a>
        )}
        {props.deployLink && (
          <a
            className='mx-5 text-sm  hover:text-benhammondyellow md:mr-10 md:ml-0'
            href={props.deployLink}
          >
            View Site&#x2197;
          </a>
        )}
        <a
          className='mx-5 text-sm  hover:text-benhammondyellow md:mr-10 md:ml-0'
          href={props.repoLink}
        >
          GitHub Repo&#x2197;
        </a>
      </div>
    </div>
  )
}

export { CompletedWebApp }
