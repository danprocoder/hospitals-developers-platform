import * as React from 'react'
import { Link } from 'react-router-dom'
import * as Prism from 'prismjs'
import * as QueryString from 'querystring'
import { MapPin } from 'react-feather'
import CopyButton from '../components/copy-button'
import Template from './templates/default'
import InputField from '../components/input-field'
import Button from '../components/button'
import CodeCard, { CodeCardTabContent } from '../components/code-card'
import '../../public/scss/pages/home.scss'

declare const API_BASE_URL: string
declare const TEST_API_KEY: string

class TryItOut extends React.Component<any> {

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
    locationIsLoading: false,
    isGettingResult: false
  }

  setEndpoint (event: any): void {
    this.setState({ endPoint: event.target.value })
  }

  fetchResults (): void {
    type UrlParam = {
      state?: string,
      longitude?: string,
      latitude?: string,
      radius?: string
    }

    let urlPath = ''
    let params: UrlParam = {}
    const { request, formData, endPoint } = this.state

    // Set urlPath
    if (endPoint === 'specific_location') {
      urlPath = '/hospitals'
      params.state = formData.state
    } else if (endPoint === 'certain_radius') {
      urlPath = '/hospitals/nearby'
      params.longitude = formData.longitude
      params.latitude = formData.latitude
      params.radius = formData.radius
    }
    // Prepare query parameter
    const paramsString = QueryString.stringify(params)
    if (paramsString) urlPath += '?'.concat(paramsString)

    // Set to
    this.setState({
      isGettingResult: true,
      request: { ...request, path: urlPath, params }
    })

    fetch(API_BASE_URL.concat(urlPath), {
      headers: {
        'access-token': TEST_API_KEY
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

  useCurrentLocation (event: any): void {
    event.preventDefault()

    const { geolocation = null } = navigator

    if (geolocation) {
      this.setState({ locationIsLoading: true })

      geolocation.getCurrentPosition((position: Position) => {
        const { latitude, longitude } = position.coords

        this.setState({
          formData: { ...this.state.formData, latitude, longitude },
          locationIsLoading: false
        })
      })
    }
  }

  render () {
    const {
      isGettingResult,
      response,
      request,
      formData,
      endPoint,
      locationIsLoading
    } = this.state

    return (
      <div className='try-it-out-section center-container'>
        <div className='header-container'>
          <h4>Try it Out</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className='test-form'>
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
                <InputField
                  label='Latitude'
                  onChange={(value: string) => this.onFieldValueChanged('latitude', value)}
                  value={formData.latitude}
                />
                <InputField
                  label='Longitude'
                  onChange={(value: string) => this.onFieldValueChanged('longitude', value)}
                  value={formData.longitude}
                />
                <div>
                  {locationIsLoading ? (
                    <div>Getting your location...</div>
                  ) : (
                    <a
                      href='#'
                      onClick={(event: any) => this.useCurrentLocation(event)}
                    >
                      <MapPin />
                      Use Current Location
                    </a>
                  )}
                </div>
                <InputField
                  label='Radius (m)'
                  onChange={(value: string) => this.onFieldValueChanged('radius', value)}
                />
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
                  <span className='url'>{API_BASE_URL.concat(request.path)}</span>
                  <CopyButton
                    text={API_BASE_URL.concat(request.path)}
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

let totalNumHospitals = 345759490
const increaseBy = Math.round(totalNumHospitals / 30)

export default function () {
  const [numHospitals, setNumHospitals] = React.useState(0)

  function increaseCount () {
    const increased = numHospitals + increaseBy > totalNumHospitals
      ? totalNumHospitals
      : numHospitals + increaseBy
    setNumHospitals(increased)
  }

  React.useEffect(() => {
    if (numHospitals === 0) {
      increaseCount()
    } else {
      if (numHospitals < totalNumHospitals) {
        setTimeout(increaseCount, 10)
      }
    }
  })

  return (
    <Template>
      <div className='center-container introduction-section'>
        <h1>Welcome to the Developer&apos;s Platform</h1>
        <div>API to get all hospitals in Nigeria</div>
        <div
          className='starter-links'
        >
          <Link
            to='/signup'
            className='get-started-link'
          >
            Get Started {`\u2192`}
          </Link>
          <a
            href='#'
            className='try-it-out-link'
          >
            Try it Out
          </a>
        </div>
      </div>
      <div className='counter-section center-container'>
        <div className='number'>
          {numHospitals.toString().replace(/\B(?=(\d{3})+$)/g, ',')}
        </div>
        <div>healthcare centres in Nigeria added</div>
      </div>
      <TryItOut className='center-container' />
    </Template>
  )
}
