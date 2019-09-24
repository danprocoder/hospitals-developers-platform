import * as React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import * as Cookie from 'js-cookie'

function Template (props: any): any {
  function logOut (event: React.MouseEvent) {
    event.preventDefault()

    Cookie.remove('user-token')
    props.history.push('/')
  }

  return (
    <div>
      <div>
        <div>
          <Link to='/dashboard'>Logo</Link>
        </div>
        <div>
          <ul>
            <li>
              <a href='/documentation'>Documentation</a>
            </li>
            <li>
              <a href='/#'>Firstname Lastname</a>
              <ul>
                <li><a href='#' onClick={logOut}>Log Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default withRouter(Template)
