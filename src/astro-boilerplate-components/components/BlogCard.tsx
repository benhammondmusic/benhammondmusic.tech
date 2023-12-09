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
          alt=''
          loading='lazy'
        />
      </div>

      <div className='px-3 pt-4 pb-6 text-center'>
        <h2 className='text-lg font-semibold'>“{props.postTitle}”</h2>
      </div>
    </div>
  </a>
)

export { BlogCard }
