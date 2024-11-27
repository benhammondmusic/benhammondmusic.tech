import { Connect, GradientText, Section } from '../astro-boilerplate-components'

const CTA = () => (
  <Section>
    <Connect
      title={
        <div className='font-rubik'>
          Let's build <GradientText>together!</GradientText>
        </div>
      }
      description={
        <>
          <a
            className='text-benhammondyellow hover:underline'
            href='mailto:hello@benhammondmusic.tech'
          >
            Email me
          </a>
          , or connect on{' '}
          <a
            className='text-benhammondyellow hover:underline'
            href='https://github.com/benhammondmusic'
          >
            GitHub
          </a>{' '}
          and{' '}
          <a
            className='text-benhammondyellow hover:underline'
            href='https://www.linkedin.com/in/benhammondmusic'
          >
            LinkedIn
          </a>
          .
        </>
      }
    />
  </Section>
)

export { CTA }
