import * as React from 'react'
import { Link } from 'react-router-dom'
import Template from './templates/default.tsx'
import InputField from '../components/input-field.tsx'
import Button from '../components/button.tsx'

class TryItOut extends React.Component<any> {
  render () {
    return (
      <div>
        <div>
          <h4>Try it Out</h4>
        </div>
        <div>
          <form>
            <div>
              <InputField />
            </div>
            <div>
              <InputField />
            </div>
            <div>
              <Button text='Get Result' />
            </div>
          </form>
          <div>
            <div>
              <ul>
                <li>
                  <a href='#'>Request</a></li>
                <li>
                  <a href='#'>Response</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default class Home extends React.Component<any> {
  render (): any {
    return (
      <Template>
        <div>
          <h1>Welcome to the Developer&apos;s Platform</h1>
          <div>API to get all hospitals in Nigeria</div>
          <div>
            <Link to='/signup'>Get Started {`\u2192`}</Link>
            <a href='#'>Try it Out</a>
          </div>
        </div>
        <div>
          345,343,345 healthcare centres in Nigeria added
        </div>
        <TryItOut />
      </Template>
    )
  }
}
