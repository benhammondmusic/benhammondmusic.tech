import { fetchRecentPosts } from '@/utils/graphQl'
import { BlogCard } from './BlogCard'

export const prerender = false
const posts = await fetchRecentPosts()

const BlogGallery = () => (
	<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 bg-gradient-to-br p-4 from-benhammondyellow to-benhammondyellow-600 rounded-md'>
		{posts?.map(
			(postItem: {
				title: string
				coverImage: { url: string }
				slug: string
			}) => {
				return (
					<BlogCard
						key={postItem.slug}
						postSlug={postItem.slug}
						postTitle={postItem.title}
						postImgUrl={postItem.coverImage.url}
					/>
				)
			}
		)}
	</div>
)

export { BlogGallery }
