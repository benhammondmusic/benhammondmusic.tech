import {
  BlogGallery,
  GradientText,
  Section,
} from '../astro-boilerplate-components'

const RecentPosts = () => (
  <Section
    title={
      <div className='flex  justify-between '>
        <div className='font-rubik'>
          Recent <GradientText>Posts</GradientText>
        </div>

        <div className='text-sm'>
          <a
            className='hover:text-benhammondyellow flex flex-col sm:block italic md:not-italic'
            href='https://blog.benhammondmusic.tech'
          >
            <span>Read my </span>
            <span>tech blog ↗</span>
          </a>
        </div>
      </div>
    }
  >
    <BlogGallery />
  </Section>
)

export { RecentPosts }
