type IBlogCardProps = {
  postSlug: string
  postTitle: string
  postImgUrl?: string
}

const BlogCard = (props: IBlogCardProps) => (
  <a
    className='hover:translate-y-1 focus:translate-y-1'
    href={`/blog/${props.postSlug}`}
  >
    <div className='overflow-hidden rounded-md bg-slate-800 h-full'>
      {props.postImgUrl ? (
        <div className='aspect-w-2 aspect-h-1'>
          <img
            className='h-full w-full object-cover object-center'
            src={props.postImgUrl}
            alt={props.postTitle}
            loading='lazy'
          />
        </div>
      ) : (
        <div className='aspect-w-2 aspect-h-1 flex items-center justify-center bg-gradient-to-br from-benhammondblue-900 to-benhammondblue p-4'>
          <span className='text-sm font-semibold text-center text-gray-200 line-clamp-3'>
            {props.postTitle}
          </span>
        </div>
      )}
    </div>
  </a>
)

export { BlogCard }
