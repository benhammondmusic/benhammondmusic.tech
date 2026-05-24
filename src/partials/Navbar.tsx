import {
  Logo,
  NavbarTwoColumns,
  NavMenu,
  NavMenuItem,
  Section,
} from '../astro-boilerplate-components'

const Navbar = () => (
  <Section>
    <NavbarTwoColumns>
      <a href='/'>
        <Logo name='benhammondmusic.tech' />
      </a>

      <NavMenu>
        <NavMenuItem href='https://github.com/benhammondmusic'>
          GitHub
        </NavMenuItem>
        <NavMenuItem href='https://www.linkedin.com/in/benhammondmusic/'>
          LinkedIn
        </NavMenuItem>
        <NavMenuItem href='/blog'>Blog</NavMenuItem>
        <NavMenuItem href='https://benhammondmusic.com'>Music</NavMenuItem>
      </NavMenu>
    </NavbarTwoColumns>
  </Section>
)

export { Navbar }
