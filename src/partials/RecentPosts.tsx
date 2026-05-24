import {
  BlogGallery,
  GradientText,
  Section,
} from '../astro-boilerplate-components'

type BlogPost = {
  slug: string
  title: string
  imgSrc?: string
}

type RecentPostsProps = {
  posts: BlogPost[]
}

const RecentPosts = (props: RecentPostsProps) => (
  <Section
    title={
      <div className='flex justify-between'>
        <div className='font-rubik'>
          Recent <GradientText>Posts</GradientText>
        </div>

        <div className='text-sm'>
          <a
            className='hover:text-benhammondyellow flex flex-col sm:block italic md:not-italic'
            href='/blog'
          >
            <span>Read the </span>
            <span>tech blog ↗</span>
          </a>
        </div>
      </div>
    }
  >
    <BlogGallery posts={props.posts} />
  </Section>
)

export { RecentPosts }
