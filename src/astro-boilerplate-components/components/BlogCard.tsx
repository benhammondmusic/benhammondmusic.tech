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
        <div className='aspect-w-2 aspect-h-1'>
          <div className='flex items-center justify-center bg-gradient-to-br from-slate-900 to-benhammondblue p-6'>
            <span className='text-base font-bold text-center text-white leading-snug line-clamp-4'>
              {props.postTitle}
            </span>
          </div>
        </div>
      )}
    </div>
  </a>
)

export { BlogCard }
