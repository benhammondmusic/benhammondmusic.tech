// import { format } from 'date-fns';

type IBlogCardProps = {
  postItem: any;
  postImg: any;
};

const BlogCard = (props: IBlogCardProps) => (
  <a
    className="hover:translate-y-1"
    href={`https://blog.benhammond.tech/${props.postItem.slug}`}
  >
    <div className="overflow-hidden rounded-md bg-slate-800">
      <div className="aspect-w-2 aspect-h-1">
        <img
          className="h-full w-full object-cover object-center"
          src={props.postImg}
          alt=""
          loading="lazy"
        />
      </div>

      <div className="px-3 pt-4 pb-6 text-center">
        <h2 className="text-lg font-semibold">“{props.postItem.title}”</h2>

        {/* <div className="mt-1 text-xs text-gray-400">
          {format(new Date(props.instance.frontmatter.pubDate), 'LLL d, yyyy')}
        </div> */}

        {/* <div className="mt-2 text-sm">
          {props.instance.frontmatter.description}
        </div> */}
      </div>
    </div>
  </a>
);

export { BlogCard };
