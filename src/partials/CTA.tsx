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
            className="text-benhammondyellow hover:underline"
            href="mailto:hello@benhammond.tech"
          >
            Email me
          </a>
          , or connect on{' '}
          <a
            className="text-benhammondyellow hover:underline"
            href="https://github.com/benhammondmusic"
          >
            GitHub
          </a>{' '}
          and{' '}
          <a
            className="text-benhammondyellow hover:underline"
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
