type IFooterCopyrightProps = {
  site_name: string
}

const FooterCopyright = (props: IFooterCopyrightProps) => (
  <div className='border-t border-benhammondblue-50 pt-5 text-center'>
    <div className='text-sm text-gray-200'>
      © Copyright {new Date().getFullYear()} by {props.site_name} &{' '}
      <a
        className='hover:text-benhammondyellow hover:underline'
        href='https://github.com/ixartz/Astro-boilerplate'
        target='_blank'
        rel='noopener noreferrer'
      >
        CreativeDesignsGuru
      </a>
      .
    </div>
  </div>
)

export { FooterCopyright }
