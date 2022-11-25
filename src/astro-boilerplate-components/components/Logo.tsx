import type { ReactNode } from 'react';

type ILogoProps = {
  icon?: ReactNode;
  name: string;
};

const Logo = (props: ILogoProps) => (
  <div className="flex items-center bg-gradient-to-br from-benhammondblue-50 to-cyan-300 bg-clip-text text-xl font-bold text-transparent">
    {props.icon}

    {props.name}
  </div>
);

export { Logo };
