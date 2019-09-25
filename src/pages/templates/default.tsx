import * as React from 'react'
import { Link } from 'react-router-dom'

interface TemplateProps {
  children: React.ReactNode
}

const Header = (): JSX.Element => (
  <div>
    <div>
      <Link to='/'>Logo</Link>
    </div>
    <ul>
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
)

const Footer = (): JSX.Element => (
  <div>
    <div>
      Nigeria Healthcare Centres {`\u00A9`} 2019
    </div>
    <div>
      <a href='#'>Contact Us</a>
    </div>
  </div>
)

export default (props: TemplateProps): JSX.Element => (
  <div>
    <Header />

    <div>
      {props.children}
    </div>

    <Footer />
  </div>
)
