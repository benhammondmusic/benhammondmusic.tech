import type { ReactNode } from 'react'

type IConnectProps = {
  title: ReactNode
  description: ReactNode
}

const Connect = (props: IConnectProps) => (
  <div className='flex flex-col items-center justify-evenly gap-6 sm:flex-row text-center md:text-left'>
    <div className='sm:w-7/12'>
      <div className='text-2xl font-bold'>{props.title}</div>

      <p className='mt-3 text-gray-300'>{props.description}</p>
    </div>

    <div className='w-full sm:w-2/12'>
      <a
        href='mailto:hello@benhammond.tech'
        className='ml-2 shrink-0 cursor-pointer rounded-full bg-gradient-to-br from-benhammondblue-50 to-cyan-300 px-5 py-3 text-sm font-medium text-benhammondblue-700 hover:from-benhammondblue-800 hover:to-cyan-800 hover:text-benhammondblue-50 focus:ring-2 focus:ring-benhammondyellow-300/50'
      >
        Email me
      </a>
    </div>
  </div>
)

export { Connect }
