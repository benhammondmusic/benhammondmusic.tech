import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from '../astro-boilerplate-components';

const ProjectList = () => (
  <Section
    title={
      <>
        Recent <GradientText>Coding Projects</GradientText>
      </>
    }
  >
    <div className="flex flex-col gap-6">
      <Project
        name="Little Cabin"
        description="Securely share your family's get-away and memories. Fullstack Python App with Django. Created this web app to provide my extended family integrated property management tools. Syncs consensus-based scheduling with Google Calendar API using a Google Cloud Platform service account; Heroku deployment required customized configuration to generate required credentials file. “Demo” logs in a pre-authenticated account and programmatically generates additional test accounts with tiered authentication and incoming action requests to demonstrate user-to-user interactions. Prioritizes responsive design with media queries and CSS variables; persistent dark mode toggle selection."
        link="https://blog.benhammond.tech/connecting-google-cal-api-and-django"
        img={{
          src: '/assets/images/little-cabin.png',
          alt: 'Little Cabin Project',
        }}
        category={
          <>
            <Tags color={ColorTags.YELLOW}>Python</Tags>
            <Tags color={ColorTags.YELLOW}>Django</Tags>
            <Tags color={ColorTags.YELLOW}>PostgreSQL</Tags>
            <Tags color={ColorTags.YELLOW}>AWS</Tags>
            <Tags color={ColorTags.YELLOW}>GCP</Tags>
          </>
        }
      />

      <Project
        name="GigBoard"
        description="Fullstack app for connecting short-term gig-workers, built in JavaScript (MERN stack)
				Uses Model-View-Controller (MVC) design pattern, user stories, and an internal RESTful API. CRUD functionality restricted per user status; offers custom encrypted registration or Google OAuth login. Project-managed team of 6, utilizing GitHub's agile board to delegate and to minimize merge conflicts. Wrote 3 technical posts, assisting team members with deployments and environmental variables; provided hands-on assistance on multiple occasions and helped instructor solve another team's bug. Personally contributed across the stack: scaffolding functional React components; dynamic searching, useState() and useEffect() hooks for state management and side-effects; assisted with JWT process."
        link="https://github.com/benhammondmusic/gigboard"
        img={{ src: '/assets/images/gigboard.png', alt: 'GigBoard Project' }}
        category={
          <>
            <Tags color={ColorTags.VIOLET}>Node</Tags>
            <Tags color={ColorTags.VIOLET}>MongoDB</Tags>
            <Tags color={ColorTags.VIOLET}>Express</Tags>
            <Tags color={ColorTags.VIOLET}>JavaScript</Tags>
            <Tags color={ColorTags.VIOLET}>React</Tags>
            <Tags color={ColorTags.VIOLET}>Bootstrap</Tags>
          </>
        }
      />
      <Project
        name="Tanks!"
        description="Animated JavaScript artillery game using JQuery and HTML Canvas; built in one week. Incorporated programmatically generated terrain and collision detection / destruction, gravity, scalable multiplayer mode, and responsive design."
        link="/"
        img={{ src: '/assets/images/tanks.png', alt: 'Tanks Game Project' }}
        category={
          <>
            <Tags color={ColorTags.ROSE}>HTML Canvas</Tags>
            <Tags color={ColorTags.ROSE}>JQuery</Tags>
            <Tags color={ColorTags.ROSE}>JavaScript</Tags>
          </>
        }
      />
      <Project
        name="Family Friendly"
        description="Crowd-sourced changing table locations for caregivers of all genders
				Delegates and restricts users' CRUD permissions with OAuth2; plots user location and data with Google Maps API; integrates a deployed MongoDB Atlas NoSQL database; internally operates a RESTful API backend in Node/Express with EJS templating."
        link="/"
        img={{
          src: '/assets/images/family-friendly.png',
          alt: 'Family Friendly Project',
        }}
        category={
          <>
            <Tags color={ColorTags.TEAL}>Node</Tags>
            <Tags color={ColorTags.TEAL}>NoSQL</Tags>
            <Tags color={ColorTags.TEAL}>Express / EJS</Tags>
            <Tags color={ColorTags.TEAL}>OAuth</Tags>
          </>
        }
      />
      <Project
        name="Gig Uploader"
        description="Boost music promotion with Python
				Automate gig promotion by programmatically submitting to multiple online event services. User inputs details into a local .xls spreadsheet, and the data is uploaded publicly to Songkick, BandsInTown, Strumsy, and privately to Dubsado. Further integration propagates this information to Spotify, Google, a user's Google Calendar, and many more locations."
        link="/"
        img={{
          src: '/assets/images/gig-uploader.png',
          alt: 'Gig Uploader Project',
        }}
        category={
          <>
            <Tags color={ColorTags.SLATE}>Python</Tags>
            <Tags color={ColorTags.SLATE}>Selenium</Tags>
            <Tags color={ColorTags.SLATE}>BeautifulSoup</Tags>
          </>
        }
      />
    </div>
  </Section>
);

export { ProjectList };
