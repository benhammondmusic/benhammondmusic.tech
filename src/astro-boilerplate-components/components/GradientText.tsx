import type { ReactNode } from 'react'

type IGradientTextProps = {
  children: ReactNode
  className?: string
}

const GradientText = (props: IGradientTextProps) => (
  <span
    className={`${
      props.className ?? ''
    } bg-gradient-to-br from-white to-benhammondyellow-500 bg-clip-text text-transparent`}
  >
    {props.children}
  </span>
)

export { GradientText }
