import {
  GradientText,
  HeroAvatar,
  Section,
} from '../astro-boilerplate-components';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <div className="m-2 pb-2">
          <GradientText>Ben Hammond</GradientText>
        </div>
      }
      subtitle={
        <div className="m-2 pb-2">
          <p>
            Denver Developer <GradientText>&&</GradientText> Song Builder
          </p>
        </div>
      }
      description={
        <>
          <p className="m-2 pb-2">
            I'm an endlessly curious web developer with 15+ years performing and
            operating a{' '}
            <a
              className="text-benhammondyellow hover:underline"
              href="https://benhammondmusic.com"
            >
              tech-forward music business
            </a>
            . I am a graduate of McGill University and General Assembly, living
            in Denver, Colorado with my family.
          </p>
          <p className="m-2 pb-2">
            I am currently employed by the Morehouse School of Medicine, proudly
            working as a software engineer on the open-source{' '}
            <a
              className="text-benhammondyellow hover:underline"
              href="https://healthequitytracker.org"
            >
              Health Equity Tracker
            </a>
            , which was built by Google.org and is now further expanded by the
            Satcher Health Leadership Institute.
          </p>
          <p className="m-2 pb-2">
            I believe deeply in the power of music and technology to uplift our
            communities, so please reach out if I can help or answer any
            questions you may have. Let's build something together!
          </p>
          <div className="mt-5">
            <a
              href="https://docs.google.com/document/d/1nYJf1ZjGetUo8lFbwoyf23prkTw-0H_HiqvMKlY5_nw"
              className="m-5 text-lg font-semibold hover:text-benhammondyellow"
            >
              ☆ Resume
            </a>
            <a
              href="https://blog.benhammond.tech"
              className="m-5 text-lg font-semibold hover:text-benhammondyellow"
            >
              ☆ Blog
            </a>
            <a
              href="mailto:hello@benhammond.tech"
              className="m-5 text-lg font-semibold hover:text-benhammondyellow"
            >
              ☆ Email
            </a>
          </div>
        </>
      }
      avatar={
        <img
          className="h-64 rounded-2xl"
          src="/assets/images/ben.jpg"
          alt="Ben Hammond selfie holding guitar with a Denver sunset glowing behind"
          // loading="lazy"
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
