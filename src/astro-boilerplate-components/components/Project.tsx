import type { ReactNode } from 'react';

type IProjectProps = {
  img: {
    src: string;
    alt: string;
  };
  name: string;
  summary: string;
  description?: string;
  descriptionList?: ReactNode;
  deployLink?: string;
  blogLink?: string;
  repoLink: string;
  category: ReactNode;
};

const Project = (props: IProjectProps) => {
  const link = props.deployLink ?? props.blogLink ?? props.repoLink;

  return (
    <div className="flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-3 md:flex-row">
      <div className="shrink-0">
        <a href={link}>
          <img
            className="h-36 w-36 rounded hover:translate-y-1"
            src={props.img.src}
            alt={props.img.alt}
            loading="lazy"
          />
        </a>
        <div className="mt-3 text-center text-2xl font-semibold">
          {props.name}
        </div>
      </div>

      <div>
        <div className="flex w-full flex-col items-center justify-between  gap-y-2 md:flex-row">
          <div className="my-3 text-xl font-semibold ">{props.summary}</div>
          <div className="mb-5 flex w-96 text-right font-semibold md:flex-col lg:flex-none ">
            {props.blogLink && (
              <a
                className="mx-5 text-sm  hover:text-benhammondyellow md:mr-10"
                href={props.blogLink}
              >
                Blog Post&#x2197;
              </a>
            )}
            {props.deployLink && (
              <a
                className="mx-5 text-sm  hover:text-benhammondyellow md:mr-10"
                href={props.deployLink}
              >
                View Site&#x2197;
              </a>
            )}
            <a
              className="mx-5 text-sm  hover:text-benhammondyellow md:mr-10"
              href={props.repoLink}
            >
              GitHub Repo&#x2197;
            </a>
          </div>
        </div>

        {props?.description && <p>{props.description}</p>}
        {props.descriptionList && (
          <details>
            <summary className="cursor-pointer py-3 font-semibold hover:text-benhammondyellow">
              Role details
            </summary>
            {props.descriptionList}
          </details>
        )}
        <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
          {props.category}
        </div>
      </div>
    </div>
  );
};

export { Project };
