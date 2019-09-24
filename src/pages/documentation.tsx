import * as React from 'react'
import { Copy } from 'react-feather'
import { Link } from 'react-router-dom'
import * as Toastr from 'toastr'
import { copyToClipboard } from '../utils/clipboard.ts'
import Template from './templates/default.tsx'
import CodeCard, { CodeCardTabContent } from '../components/code-card.tsx'
import '../../public/scss/pages/documentation.scss'

interface URLParametersProps {
  parameters: any[]
}
function URLParameters (props: URLParametersProps): JSX.Element {
  return (
    <table className='url-params-table'>
      <tbody>
      {props.parameters.map((param, index) => (
        <tr key={index.toString()}>
          <td>
            {param.name}
            <br />
            <span className='type'>{param.type}</span>
          </td>
          <td>{param.required
            ? <span className='required'>Required</span>
            : <span className='optional'>Optional</span>
          }</td>
          <td>{param.description}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

interface URLProps {
  method: string,
  url: string
}
function URL (props: URLProps): JSX.Element {
  function copyUrlToClipboard (url: string) {
    copyToClipboard(url)
    Toastr.success('URL copied to clipboard')
  }

  return (
    <div className='url-container'>
      <span className='method'>{props.method.toUpperCase()}</span>
      <span className='url'>{props.url}</span>
      <button className='copy-btn' onClick={() => copyUrlToClipboard(props.url)}>
        <Copy />
      </button>
    </div>
  )
}

/* SECTIONS */

function IntroductionSection () {
  return (
    <div>
      <h2>Introduction</h2>
      <div>
        <Link to='/signup'>Get your API key</Link>
      </div>
    </div>
  )
}

function ApiDocumentationSection () {
  return (
    <div>
      <h2>API Documentation</h2>
      <div>
        <div>
          <h4>Getting health centres in a specific location</h4>
          <div>
            <div>
              <URL
                method='get'
                url='http://api.nigeriahealthcarecentres.com/api/v1/hospitals'
              />
            </div>
            <div>
              <URLParameters
                parameters={[
                  { name: 'state', type: 'string', required: false, description: 'This is the description' },
                  { name: 'page', type: 'number', required: false, description: 'This is the description' },
                  { name: 'size', type: 'number', required: false, description: 'This is the description' }
                ]}
              />
            </div>
            <div>
              <CodeCard
                tabMenus={[
                  { id: 'js', text: 'JavaScript' },
                  { id: 'curl', text: 'CURL' }
                ]}
              >
                <CodeCardTabContent
                  key='js'
                  id='js'
                >
                  {'fetch().then().catch()'}
                </CodeCardTabContent>
                <CodeCardTabContent
                  key='curl'
                  id='curl'
                >
                  {'$ curl http://api.blah.com/api/v1/hospitals'}
                </CodeCardTabContent>
              </CodeCard>
            </div>
          </div>
        </div>
        <div>
          <h4>Getting health care centres within a certain radius</h4>
          <div>
            <div>
              <URL
                method='get'
                url='http://api.nigeriahealthcarecentres.com/api/v1/hospitals/nearby'
              />
            </div>
            <div>
              <URLParameters
                parameters={[
                  { name: 'lat', type: 'decimal', required: true, description: 'This is the description' },
                  { name: 'long', type: 'decimal', required: true, description: 'This is the description' },
                  { name: 'radius', type: 'number', required: false, description: 'This is the description' },
                  { name: 'page', type: 'number', required: false, description: 'This is the description' },
                  { name: 'size', type: 'number', required: false, description: 'This is the description' }
                ]}
              />
            </div>
            <div>
              <CodeCard
                tabMenus={[
                  { id: 'js', text: 'JavaScript' },
                  { id: 'curl', text: 'CURL' }
                ]}
              >
                <CodeCardTabContent
                  key='js'
                  id='js'
                >
                  {'fetch().then().catch()'}
                </CodeCardTabContent>
                <CodeCardTabContent
                  key='curl'
                  id='curl'
                >
                  {'$ curl http://api.blah.com/api/v1/hospitals'}
                </CodeCardTabContent>
              </CodeCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default class DocumentationPage extends React.Component {
  render (): JSX.Element {
    return (
      <Template>
        <div style={{ display: 'flex', 'flexDirection': 'row' }}>
          <div style={{ position: 'fixed', width: '200px' }}>
            <h4>Table of Content</h4>
            <ul>
              <li><a href='#'>Introduction</a></li>
              <li>
                <a href='#'>API Documentation</a>
                <ul>
                  <li><a href='#'>Getting health centres in a specific location</a></li>
                  <li><a href='#'>Getting health care centres within a certain radius</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div style={{ marginLeft: '200px' }}>
            <IntroductionSection />
            <ApiDocumentationSection />
          </div>
        </div>
      </Template>
    )
  }
}
