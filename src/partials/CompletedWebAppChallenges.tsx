import FamilyFriendly from 'src/assets/images/family-friendly.png'
import GigUploader from 'src/assets/images/gig-uploader.png'
import GigBoard from 'src/assets/images/gigboard.png'
import LittleCabin from 'src/assets/images/little-cabin.png'
import Tanks from 'src/assets/images/tanks.png'

import {
  ColorTags,
  GradientText,
  Section,
  Tags,
} from '../astro-boilerplate-components'
import { CompletedWebApp } from '@/astro-boilerplate-components/components/CompletedWebApp'

const CompletedWebAppChallenges = () => (
  <>
    <Section
      title={
        <div className='font-rubik'>
          Completed <GradientText>App Challenges</GradientText>
        </div>
      }
    >
      <div className='flex flex-col gap-6 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md p-6'>
        <CompletedWebApp
          name='Little Cabin'
          description='Fullstack Python App with Django and Google Calendar API'
          descriptionList={
            <ul className='list-square'>
              <li>
                {' '}
                Created this web app to provide my extended family integrated
                property management tools.
              </li>
              <li>
                Syncs consensus-based scheduling with Google Calendar API using
                a Google Cloud Platform service account.
              </li>
              <li>
                Heroku deployment required customized configuration to generate
                required credentials file.
              </li>
              <li>
                “Demo” logs in a pre-authenticated account and programmatically
                generates additional test accounts with tiered authentication
                and incoming action requests to demonstrate user-to-user
                interactions.
              </li>
              <li>
                Prioritizes responsive design with media queries and CSS
                variables; persistent dark mode toggle selection.
              </li>
            </ul>
          }
          blogLink='https://blog.benhammond.tech/connecting-google-cal-api-and-django'
          repoLink='https://github.com/benhammondmusic/littlecabin'
          img={{
            src: LittleCabin.src,
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

        <CompletedWebApp
          name='GigBoard'
          description='MERN stack web app connecting gig-workers'
          descriptionList={
            <ul className='list-square'>
              <li>
                Uses Model-View-Controller (MVC) design pattern, user stories,
                and an internal RESTful API.
              </li>
              <li>
                CRUD functionality restricted per user status; offers custom
                encrypted registration or Google OAuth login.
              </li>
              <li>
                Project-managed team of 6, utilizing GitHub's agile board to
                delegate and to minimize merge conflicts; provided hands-on
                assistance on multiple occasions and helped instructor solve
                another team's bug..
              </li>
              <li>
                Wrote 3 technical posts, assisting team members with deployments
                and environmental variables.
              </li>
              <li>
                Personally contributed across the stack: scaffolding functional
                React components; dynamic searching; hooks for state management
                and side-effects; assisted with JWT process.
              </li>
            </ul>
          }
          blogLink='https://blog.benhammond.tech/connecting-your-deployed-frontend-backend-and-mongodb-atlas-database'
          repoLink='https://github.com/benhammondmusic/gigboard'
          img={{
            src: GigBoard.src,
            alt: 'GigBoard Project',
          }}
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
        <CompletedWebApp
          name='Tanks!'
          description='Classic artillery game, built in 1 week with HTML Canvas'
          descriptionList={
            <ul className='list-square'>
              <li>
                Incorporated programmatically generated terrain and collision
                detection / destruction, gravity, scalable multiplayer mode, and
                responsive design.
              </li>
            </ul>
          }
          deployLink='https://tanks-js.netlify.app/'
          blogLink='https://blog.benhammond.tech/tanks'
          repoLink='https://github.com/benhammondmusic/tanks'
          img={{ src: Tanks.src, alt: 'Tanks Game Project' }}
          category={
            <>
              <Tags color={ColorTags.ORANGE}>HTML Canvas</Tags>
              <Tags color={ColorTags.ORANGE}>JQuery</Tags>
              <Tags color={ColorTags.ORANGE}>JavaScript</Tags>
            </>
          }
        />
        <CompletedWebApp
          name='Family Friendly'
          description='Crowd-sourced help for caregivers of all genders'
          blogLink='https://blog.benhammond.tech/familyfriendly'
          descriptionList={
            <ul className='list-square'>
              <li>
                Delegates and restricts users' CRUD permissions with OAuth2.
              </li>
              <li>Plots user location and data with Google Maps API.</li>
              <li>Integrates a deployed MongoDB Atlas NoSQL database.</li>
              <li>
                Internally operates a RESTful API backend in Node/Express with
                EJS templating.
              </li>
            </ul>
          }
          repoLink='https://github.com/benhammondmusic/familyfriendly'
          img={{
            src: FamilyFriendly.src,
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
        <CompletedWebApp
          name='Gig Uploader'
          description='Boost music promotion with web-scraping'
          descriptionList={
            <ul className='list-square'>
              <li>
                Automate gig promotion by programmatically submitting to
                multiple online event services.
              </li>
              <li>
                User inputs details into a local .xls spreadsheet, and the data
                is uploaded publicly to Songkick, BandsInTown, Strumsy, and
                privately to Dubsado.
              </li>
              <li>
                Further integration propagates this information to Spotify,
                Google, a user's Google Calendar, and many more locations.
              </li>
            </ul>
          }
          blogLink='https://blog.benhammond.tech/giguploader'
          repoLink='https://github.com/benhammondmusic/giguploader'
          img={{
            src: GigUploader.src,
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
)

export { CompletedWebAppChallenges }
