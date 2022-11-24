import type { ReactNode } from 'react';

type INewsletterProps = {
  title: ReactNode;
  description: ReactNode;
};

const Newsletter = (props: INewsletterProps) => (
  <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
    <div className="sm:w-7/12">
      <div className="text-3xl font-bold">{props.title}</div>

      <p className="mt-3 text-gray-300">{props.description}</p>
    </div>

    <div className="w-full sm:w-2/12">
      <a
        href="mailto:hello@benhammond.tech"
        className="ml-2 shrink-0 cursor-pointer rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 px-5 py-3 text-sm font-medium hover:from-sky-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/50"
      >
        Email me
      </a>
    </div>
  </div>
);

export { Newsletter };
