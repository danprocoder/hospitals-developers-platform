import * as React from 'react'
import { Link } from 'react-router-dom'
import '../../../public/scss/pages/documentation/template.scss'

interface TemplateProps {
  children: React.ReactNode
}

const Header = (): JSX.Element => (
  <div className='documentation site-header'>
    <div className='inner'>
      <div className='logo-wrapper'>
        <Link to='/'>Logo</Link>
      </div>
      <ul className='site-nav'>
        <li>
          <Link to='/documentation'>Documentation</Link>
        </li>
        <li>
          <Link to='/login'>Log In</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
      </ul>
    </div>
  </div>
)

const Footer = (): JSX.Element => (
  <div className='footer'>
    <div className='inner center-container'>
      <div>
        Nigeria Healthcare Centres {`\u00A9`} 2019
      </div>
      <div>
        <a href='#'>Contact Us</a>
      </div>
    </div>
  </div>
)

export default (props: TemplateProps): JSX.Element => (
  <>
    <Header />

    <div className='site-content'>
      {props.children}
    </div>

    <Footer />
  </>
)
