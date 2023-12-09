export interface IFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  imgSrc: string;
  imgAlt: string;
}

export type Page<T> = import('astro').Page<T>;
