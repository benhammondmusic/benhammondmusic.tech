import { BlogCard } from './BlogCard'

type BlogPost = {
  slug: string
  title: string
  imgSrc?: string
}

type BlogGalleryProps = {
  posts: BlogPost[]
}

const BlogGallery = (props: BlogGalleryProps) => (
  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 bg-gradient-to-br p-4 from-benhammondyellow to-benhammondyellow-600 rounded-md'>
    {props.posts.map((post) => (
      <BlogCard
        key={post.slug}
        postSlug={post.slug}
        postTitle={post.title}
        postImgUrl={post.imgSrc ?? ''}
      />
    ))}
  </div>
)

export { BlogGallery }
