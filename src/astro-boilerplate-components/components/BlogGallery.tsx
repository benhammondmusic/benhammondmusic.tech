import { fetchRecentPosts } from '@/utils/graphQl'
import { BlogCard } from './BlogCard'

const posts = await fetchRecentPosts()

const BlogGallery = () => (
  <div className='grid grid-cols-1 gap-6 md:grid-cols-3 p-5 bg-gradient-to-br from-benhammondyellow to-benhammondyellow-600 rounded-md'>
    {posts.map(
      (postItem: { title: string; coverImage: string; slug: string }) => {
        return (
          <BlogCard
            key={postItem.slug}
            postSlug={postItem.slug}
            postTitle={postItem.title}
            postImgUrl={postItem.coverImage}
          />
        )
      }
    )}
  </div>
)

export { BlogGallery }
