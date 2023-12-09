type IBlogCardProps = {
  postSlug: string
  postTitle: string
  postImgUrl: string
}

const BlogCard = (props: IBlogCardProps) => (
  <a
    className='hover:translate-y-1'
    href={`https://blog.benhammond.tech/${props.postSlug}`}
  >
    <div className='overflow-hidden rounded-md bg-slate-800'>
      <div className='aspect-w-2 aspect-h-1'>
        <img
          className='h-full w-full object-cover object-center'
          src={props.postImgUrl}
          alt={props.postTitle}
          loading='lazy'
        />
      </div>
    </div>
  </a>
)

export { BlogCard }
