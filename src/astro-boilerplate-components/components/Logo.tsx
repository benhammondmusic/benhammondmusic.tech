import type { ReactNode } from 'react'

type ILogoProps = {
  icon?: ReactNode
  name: string
}

const Logo = (props: ILogoProps) => (
  <div className='flex bg-gradient-to-br to-benhammondyellow-50 from-white bg-clip-text  text-transparent'>
    {props.icon}

    {props.name}
  </div>
)

export { Logo }
