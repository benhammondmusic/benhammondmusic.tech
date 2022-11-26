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
      </div>

      <div>
        <div className="flex w-full flex-col  items-center justify-between gap-y-2 md:flex-row">
          <div className="text-xl font-semibold">{props.name}</div>
          <div className="font-semibold">
            {props.blogLink && (
              <a className="mr-10" href={props.blogLink}>
                Blog Post
              </a>
            )}
            {props.deployLink && (
              <a className="mr-10" href={props.deployLink}>
                View Site &#x2197;
              </a>
            )}
            <a className="mr-10" href={props.deployLink}>
              GitHub Repo &#x2197;
            </a>
          </div>
        </div>
        {props.summary}

        {props?.description && <p>{props.description}</p>}
        {props.descriptionList && (
          <details>
            <summary className="cursor-pointer py-3 font-semibold hover:text-benhammondyellow">
              Details
            </summary>
            {props.descriptionList}
          </details>
        )}
        <div className="mt-3 flex flex-wrap gap-2">{props.category}</div>
      </div>
    </div>
  );
};

export { Project };
