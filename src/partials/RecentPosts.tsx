import {
  BlogGallery,
  GradientText,
  Section,
} from '../astro-boilerplate-components'

const RecentPosts = () => (
  <Section
    title={
      <div className='flex items-baseline justify-between'>
        <div>
          Recent <GradientText>Posts</GradientText>
        </div>

        <div className='text-sm'>
          <a
            className='hover:text-benhammondyellow'
            href='https://blog.benhammond.tech'
          >
            View all posts →
          </a>
        </div>
      </div>
    }
  >
    <BlogGallery />
  </Section>
)

export { RecentPosts }
