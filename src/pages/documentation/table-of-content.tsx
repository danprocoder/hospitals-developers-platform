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
        <li {...(props.active === 'api-docs-specific-location' && { className: 'active' })}>
          <Link to='/documentation/api-doc/specific-location'>Getting health centres in a specific location</Link>
          <ul className='sub-sections' id='menu-specific-location'>
            <li><a href='#url'>API URL</a></li>
            <li><a href='#url-parameters'>URL Parameters</a></li>
            <li><a href='#example'>Example</a></li>
          </ul>
        </li>
        <li {...(props.active === 'api-docs-nearby' && { className: 'active' })}>
          <Link to='/documentation/api-doc/nearby'>Getting health care centres within a certain radius</Link>
          <ul className='sub-sections' id='menu-nearby'>
            <li><a href='#url'>API URL</a></li>
            <li><a href='#url-parameters'>URL Parameters</a></li>
            <li><a href='#example'>Example</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div className='doc-page-content'>
      <div className='inner'>{props.children}</div>
    </div>
  </>
)
