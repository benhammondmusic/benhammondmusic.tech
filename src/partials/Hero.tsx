import {
  GradientText,
  HeroAvatar,
  Section,
} from 'astro-boilerplate-components';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          <GradientText>Ben Hammond</GradientText>
          <p>Denver Developer && Song Builder</p>
        </>
      }
      description={
        <>
          <p>
            I'm an endlessly curious web developer with 15+ years performing and
            operating a tech-forward music business. I am a graduate of McGill
            University and General Assembly, living in Denver, Colorado with my
            family.
          </p>
          <p>
            I am currently employed by the Morehouse School of Medicine, proudly
            working as a software engineer on the open-source Health Equity
            Tracker, which was built by Google.org and is now further expanded
            by the Satcher Health Leadership Institute.
          </p>
          <p>
            I believe deeply in the power of music and technology to uplift our
            communities, so please reach out if I can help or answer any
            questions you may have. Let's build something together!
          </p>
        </>
      }
      avatar={
        <img
          className="h-64"
          src="/assets/images/ben.jpg"
          alt="Ben Hammond selfie holding guitar with a Denver sunset glowing behind"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          {/* <a href="/">
            <HeroSocial
              src="/assets/images/twitter-icon.png"
              alt="Twitter icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/facebook-icon.png"
              alt="Facebook icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/linkedin-icon.png"
              alt="Linkedin icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/youtube-icon.png"
              alt="Youtube icon"
            />
          </a> */}
        </>
      }
    />
  </Section>
);

export { Hero };
