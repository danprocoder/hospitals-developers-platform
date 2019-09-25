import * as React from 'react'
import { Link } from 'react-router-dom'
import * as Prism from 'prismjs'
import * as QueryString from 'querystring'
import CopyButton from '../components/copy-button'
import Template from './templates/default'
import InputField from '../components/input-field'
import Button from '../components/button'
import CodeCard, { CodeCardTabContent } from '../components/code-card'
import '../../public/scss/pages/home.scss'

class TryItOut extends React.Component<any> {
  baseUrl = 'http://api.nigeriahealthcarecentres.com/api/v1'

  state = {
    request: {
      path: '/hospitals',
      method: 'GET',
      header: {
        'Access-Token': 'YOUR_API_KEY_HERE'
      },
      params: {}
    },
    formData: {
      state: 'Abuja',
      longitude: '',
      latitude: '',
      radius: ''
    },
    endPoint: 'specific_location',
    response: '',
    isGettingResult: false
  }

  setEndpoint (event: any): void {
    this.setState({ endPoint: event.target.value })
  }

  fetchResults (): void {
    type UrlParam = { state?: string }

    let urlPath = ''
    let params: UrlParam = {}
    const { request, formData, endPoint } = this.state

    // Set urlPath
    if (endPoint === 'specific_location') {
      urlPath = '/hospitals'
      params.state = formData.state
    } else if (endPoint === 'certain_radius') {
      urlPath = '/hospitals/nearby'
    }
    // Prepare query parameter
    const paramsString = QueryString.stringify(params)
    if (paramsString) urlPath += '?'.concat(paramsString)

    // Set to
    this.setState({
      isGettingResult: true,
      request: { ...request, path: urlPath, params }
    })

    fetch(this.baseUrl.concat(urlPath), {
      headers: {
        'access-token':
          'k_4QTDWLCFqlTwRWS4Ljhp7NDxM8zfMir+PNLcGi8mJvQjPI4pYodc3SjsFuQKxBddDp31hErQDBm+234DNBTKgg=='
      }
    })
      .then((response: Response) => response.text())
      .then((response: any) => {
        this.setState({
          response: JSON.stringify(JSON.parse(response), null, 2),
          isGettingResult: false
        }, () => { Prism.highlightAll() })
      })
      .catch((err: any) => {
        console.error(err)

        this.setState({ isGettingResult: false })
      })
  }

  onFieldValueChanged (field: string, value: string): void {
    this.setState({
      formData: { ...this.state.formData, [field]: value }
    })
  }

  render () {
    const {
      isGettingResult,
      response,
      request,
      endPoint
    } = this.state

    return (
      <div className='try-it-out-section'>
        <div>
          <h4>Try it Out</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <div>
              <select onChange={(event: any) => this.setEndpoint(event)} value={endPoint}>
                <option value='specific_location'>Specific location</option>
                <option value='certain_radius'>Within a Certain Radius</option>
              </select>
            </div>
            {endPoint === 'specific_location' && (
              <>
                <div>
                  <select
                    onChange={(event: any) => this.onFieldValueChanged('state', event.target.value)}
                  >
                    <option>Abuja</option>
                    <option>Lagos</option>
                    <option>Port Harcourt</option>
                  </select>
                </div>
              </>
            )}
            {endPoint === 'certain_radius' && (
              <>
                <InputField label='Latitude' />
                <InputField label='Longitude' />
                <InputField label='Radius' />
              </>
            )}
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
              key='response'
              id='response'
            >
              <code className='response-body language-javascript'>
                {response}
              </code>
            </CodeCardTabContent>
            <CodeCardTabContent
              key='request'
              id='request'
            >
              <div className='request-body'>
                <div>
                  <span className='method'>{request.method}</span>
                  <span className='url'>{this.baseUrl.concat(request.path)}</span>
                  <CopyButton
                    text={this.baseUrl.concat(request.path)}
                    successMessage='URL copied to clipboard'
                  />
                </div>
                <div className='extra'>
                  <div className='header'>Headers</div>
                  {Object.keys(request.header).map((k: string) => (
                    <div key={k}>{k}: {(request.header as any)[k]}</div>
                  ))}
                </div>
              </div>
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
