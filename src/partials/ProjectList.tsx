import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from '../astro-boilerplate-components';

const ProjectList = () => (
  <>
    <Section
      title={
        <>
          Current Role: <GradientText>Software Engineer</GradientText>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <Project
          name="Health Equity Tracker"
          summary="Free-to-use data visualization platform enabling new insights into the impact of COVID-19 and other social and political determinants of health on historically underrepresented groups in the US; built collaboratively by Google.org and continuously expanded by the Satcher Health Leadership Institute"
          descriptionList={
            <ul className="list-inside list-disc">
              <li>
                Ownership of Health Equity Tracker frontend, coordinating MVP
                hand-off from Google.org to our small team and continuing
                development into an award-winning platform.
              </li>
              <li>
                Personally achieved: 90% reduction in dataset transfer sizes by
                adding gzip Express middleware, 85% improvement on bundle sizes
                by code-splitting and lazy-loading React components, and another
                84% reduction in data shipped on our slowest reports (100%
                faster load times) by refactoring Airflow DAGs, setting
                permissions with Terraform and using SQL to query and export
                dramatically smaller JSON files.
              </li>
              <li>
                Personally quadrupled the number of trackable data types,
                completing research and writing new Python modules that process
                datasets across disparate sources using Pandas; Docker to
                containerize and upload for execution on GCP Cloud Run /
                BigQuery.
              </li>
              <li>
                Addressed over 170 accessibility audit items, adding
                screen-reader navigation to our Vega and D3 visualizations and
                making open-source contributions to NPM packages that improved
                usability for hundreds of thousands of users
              </li>
              <li>
                Architected an integrated blog and content management system,
                utilizing a headless Wordpress dashboard and incorporating
                content directly using React Query persisted via local storage.
              </li>
              <li>
                Representing our organization in communications with NPR, CDC,
                Rutgers and Robert Wood Johnson Foundation; collaboration with
                outside agencies to allow for problem-free insertion of newly
                designed components.
              </li>
              <li>
                Improved codebase health by incorporating a systematic approach
                to our design system and development, standardizing
                implementation methods (inconsistent mix of Material UI and
                inline styles) and enforcing a select set of SASS variables
                throughout to minimize design drift. Included expanded tests to
                all new functionality; identified the lack of “end to end”
                testing and implemented coverage using Playwright, added missing
                Typescript custom typing to expedite development and prevent
                errors.
              </li>
            </ul>
          }
          link="https://healthequitytracker.org"
          img={{
            src: '/assets/images/het.svg',
            alt: 'Health Equity Tracker Project',
          }}
          category={
            <>
              <Tags color={ColorTags.EMERALD}>Python</Tags>
              <Tags color={ColorTags.EMERALD}>Pandas</Tags>
              <Tags color={ColorTags.EMERALD}>Pytest</Tags>
              <Tags color={ColorTags.EMERALD}>Docker</Tags>
              <Tags color={ColorTags.EMERALD}>Terraform</Tags>
              <Tags color={ColorTags.EMERALD}>GitHub Actions</Tags>
              <Tags color={ColorTags.EMERALD}>GCP</Tags>
              <Tags color={ColorTags.EMERALD}>BigQuery</Tags>
              <Tags color={ColorTags.EMERALD}>React</Tags>
              <Tags color={ColorTags.EMERALD}>TypeScript</Tags>
              <Tags color={ColorTags.EMERALD}>Jest</Tags>
              <Tags color={ColorTags.EMERALD}>Playwright</Tags>
              <Tags color={ColorTags.EMERALD}>SASS</Tags>
              <Tags color={ColorTags.EMERALD}>MUI</Tags>
              <Tags color={ColorTags.EMERALD}>Vega</Tags>
              <Tags color={ColorTags.EMERALD}>D3</Tags>
            </>
          }
        />
      </div>
    </Section>
    <Section
      title={
        <>
          Recent <GradientText>Side Projects</GradientText>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <Project
          name="Little Cabin"
          summary="Securely share your family's get-away and memories"
          description="Fullstack Python App with Django. Created this web app to provide
              my extended family integrated property management tools. Syncs
              consensus-based scheduling with Google Calendar API using a Google
              Cloud Platform service account; Heroku deployment required
              customized configuration to generate required credentials file.
              “Demo” logs in a pre-authenticated account and programmatically
              generates additional test accounts with tiered authentication and
              incoming action requests to demonstrate user-to-user interactions.
              Prioritizes responsive design with media queries and CSS
              variables; persistent dark mode toggle selection."
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
          summary="Fullstack app connecting gig-workers, built wth the MERN stack"
          description="Uses Model-View-Controller (MVC) design pattern, user stories, and an internal RESTful API. CRUD functionality restricted per user status; offers custom encrypted registration or Google OAuth login. Project-managed team of 6, utilizing GitHub's agile board to delegate and to minimize merge conflicts. Wrote 3 technical posts, assisting team members with deployments and environmental variables; provided hands-on assistance on multiple occasions and helped instructor solve another team's bug. Personally contributed across the stack: scaffolding functional React components; dynamic searching; hooks for state management and side-effects; assisted with JWT process."
          link="https://blog.benhammond.tech/connecting-your-deployed-frontend-backend-and-mongodb-atlas-database"
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
          summary="Classic 2d animated artillery game, build in a single week."
          description="Incorporated programmatically generated terrain and collision detection / destruction, gravity, scalable multiplayer mode, and responsive design."
          link="https://blog.benhammond.tech/tanks"
          img={{ src: '/assets/images/tanks.png', alt: 'Tanks Game Project' }}
          category={
            <>
              <Tags color={ColorTags.ORANGE}>HTML Canvas</Tags>
              <Tags color={ColorTags.ORANGE}>JQuery</Tags>
              <Tags color={ColorTags.ORANGE}>JavaScript</Tags>
            </>
          }
        />
        <Project
          name="Family Friendly"
          summary="Crowd-sourced changing table locations for caregivers of all genders"
          description="Delegates and restricts users' CRUD permissions with OAuth2; plots user location and data with Google Maps API; integrates a deployed MongoDB Atlas NoSQL database; internally operates a RESTful API backend in Node/Express with EJS templating."
          link="https://blog.benhammond.tech/familyfriendly"
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
          summary="Boost music promotion with web-scraping"
          description="Automate gig promotion by programmatically submitting to multiple online event services. User inputs details into a local .xls spreadsheet, and the data is uploaded publicly to Songkick, BandsInTown, Strumsy, and privately to Dubsado. Further integration propagates this information to Spotify, Google, a user's Google Calendar, and many more locations."
          link="https://blog.benhammond.tech/giguploader"
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
  </>
);

export { ProjectList };
