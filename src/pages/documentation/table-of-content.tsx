import * as React from 'react'
import { Link } from 'react-router-dom'

type PropTypes = { active: string, children: React.ReactNode }
export default (props: PropTypes) => (
  <>
    <div className='table-of-content'>
      <h4 className='header'>Table of Content</h4>
      <ul className='sections'>
        <li {...(props.active === 'introduction' && { className: 'active' })}>
          <Link to='/documentation'>Introduction</Link>
        </li>
        <li {...(props.active === 'api-docs' && { className: 'active' })}>
          <Link to='/documentation/api-documentation'>API Documentation</Link>
          <ul className='sub-sections'>
            <li><a href='#'>Getting health centres in a specific location</a></li>
            <li><a href='#'>Getting health care centres within a certain radius</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div className='doc-page-content'>
      <div className='inner'>{props.children}</div>
    </div>
  </>
)
