import * as React from 'react'
import { Link } from 'react-router-dom'
import Template from './templates/default'
import InputField from '../components/input-field'
import Button from '../components/button'
import CodeCard, { CodeCardTabContent } from '../components/code-card'

class TryItOut extends React.Component<any> {

  state = {
    isGettingResult: false
  }

  fetchResults (): void {
    this.setState({ isGettingResult: true })
  }

  render () {
    const { isGettingResult } = this.state

    return (
      <div>
        <div>
          <h4>Try it Out</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <div>
              <InputField />
            </div>
            <div>
              <InputField />
            </div>
            <div>
              <Button
                text='Get Result'
                isLoading={isGettingResult}
                onClick={() => this.fetchResults()}
              />
            </div>
          </div>
          <CodeCard
            tabMenus={[
              { id: 'response', text: 'Response' },
              { id: 'request', text: 'Request' }
            ]}
          >
            <CodeCardTabContent
              key='request'
              id='response'
            >
              <div>Text</div>
            </CodeCardTabContent>
            <CodeCardTabContent
              key='request'
              id='request'
            >
              <div>Text</div>
            </CodeCardTabContent>
          </CodeCard>
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
