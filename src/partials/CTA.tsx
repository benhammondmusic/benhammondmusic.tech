import {
  GradientText,
  Newsletter,
  Section,
} from 'astro-boilerplate-components';

const CTA = () => (
  <Section>
    <Newsletter
      title={
        <>
          Let's build something <GradientText>together!</GradientText>
        </>
      }
      description="Email me, or connect on GitHub and LinkedIn."
    />
  </Section>
);

export { CTA };
