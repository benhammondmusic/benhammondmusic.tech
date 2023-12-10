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
    <div className='flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-5 md:flex-row w-full '>
      <div className='w-11/12'>
        <a
          className='hover:text-benhammondyellow'
          href={props.deployLink ?? props.blogLink ?? props.repoLink}
        >
          {props.name}
          {props?.description && <span>: {props.description}</span>}
        </a>
        <div className='mt-3 flex flex-wrap justify-center gap-1 md:justify-start'>
          {props.category}
        </div>
        {props.descriptionList && (
          <details>
            <summary className='cursor-pointer py-3 text-sm hover:text-benhammondyellow'>
              Details
            </summary>
            {props.descriptionList}
          </details>
        )}
      </div>

      <div className='mb-5 flex w-96 justify-center text-right font-semibold md:flex-col lg:flex-none '>
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
