import {
  GradientText,
  Newsletter,
  Section,
} from '../astro-boilerplate-components';

const CTA = () => (
  <Section>
    <Newsletter
      title={
        <>
          Let's build something <GradientText>together!</GradientText>
        </>
      }
      description={
        <>
          <a
            className="hover:text-cyan-400"
            href="mailto:hello@benhammond.tech"
          >
            Email me
          </a>
          , or connect on{' '}
          <a
            className="hover:text-cyan-400"
            href="https://github.com/benhammondmusic"
          >
            GitHub
          </a>{' '}
          and{' '}
          <a
            className="hover:text-cyan-400"
            href="https://www.linkedin.com/in/benhammondmusic"
          >
            LinkedIn
          </a>
          .
        </>
      }
    />
  </Section>
);

export { CTA };
