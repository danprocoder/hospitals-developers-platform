import * as React from 'react'
import { Copy } from 'react-feather'
import { Switch, Route, Link } from 'react-router-dom'
import * as Toastr from 'toastr'
import * as Prism from 'prismjs'
import { copyToClipboard } from '../../utils/clipboard'
import Template from './template'
import CodeCard, { CodeCardTabContent } from '../../components/code-card'
import '../../../public/scss/pages/documentation/documentation.scss'

/* CODE EXAMPLES */
const exampleSpecificLocation = {
  js: `
fetch('http://api.nigeriahealthcarecentres.com/api/v1/hospitals', {
  headers: { 'access-token': 'YOUR_API_KEY' }
})
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err))
    `
}

const exampleNearbyLocation = {
  js: `
fetch('http://api.nigeriahealthcarecentres.com/api/v1/hospitals/nearby?lat=78.9876&lng=-167.897&radius=45', {
  headers: { 'access-token': 'YOUR_API_KEY' }
})
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err))
    `
}

/* COMPONENTS */

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
            <span className='type'>({param.type})</span>
          </td>
          <td>{param.required
            ? <span className='required'>Required</span>
            : <span className='optional'>Optional</span>
          }</td>
          <td className='description'>{param.description}</td>
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

type CodeViewProps = { code: string, rawCode: string }
function CodeView (props: CodeViewProps) {
  const code = props.code.trim()
  const rawCode = props.rawCode.trim()

  function copyCode () {
    copyToClipboard(rawCode)
    Toastr.success('Example code copied to clipboard')
  }

  const numLines: number = rawCode.split(/\n/).length

  return (
    <div className='code-view'>
      <div className='lines'>
        {Array.from(Array(numLines), (e: any, line: number) => <div key={'line' + line}>{line + 1}</div>)}
      </div>
      <div className='code'>
        <code className='language-javascript'>{code}</code>
      </div>
      <button onClick={copyCode} className='copy-btn'>
        <Copy />
      </button>
    </div>
  )
}

/* SECTIONS */

function IntroductionSection () {
  return (
    <div className='page introduction'>
      <h2 className='header'>Introduction</h2>
      <div className='content'>
        <Link to='/signup'>Get your API key</Link>
      </div>
      <div className='pagination'>
        <Link to='/documentation/api-documentation'>API Documentation &rarr;</Link>
      </div>
    </div>
  )
}

function ApiDocumentationSection () {
  return (
    <div className='page api-doc'>
      <h2 className='header'>API Documentation</h2>
      <div className='content'>
        <div className='section'>
          <h4 className='section-header'>Getting health centres in a specific location</h4>
          <div>
            <div className='api-url'>
              <URL
                method='get'
                url='http://api.nigeriahealthcarecentres.com/api/v1/hospitals'
              />
            </div>
            <div className='url-params'>
              <div>URL Parameters</div>
              <div>
                <URLParameters
                  parameters={[
                    { name: 'state', type: 'string', required: false, description: 'This is the description' },
                    { name: 'page', type: 'number', required: false, description: 'This is the description' },
                    { name: 'size', type: 'number', required: false, description: 'This is the description' }
                  ]}
                />
              </div>
            </div>
            <div className='code-card-container'>
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
                  <CodeView
                    code={exampleSpecificLocation.js}
                    rawCode={exampleSpecificLocation.js}
                  />
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
        <div className='section m-top-40'>
          <h4 className='section-header'>Getting health care centres within a certain radius</h4>
          <div>
            <div className='api-url'>
              <URL
                method='get'
                url='http://api.nigeriahealthcarecentres.com/api/v1/hospitals/nearby'
              />
            </div>
            <div className='url-params'>
              <div>URL Parameters</div>
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
            </div>
            <div className='code-card-container'>
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
                  <CodeView
                    code={exampleNearbyLocation.js}
                    rawCode={exampleNearbyLocation.js}
                  />
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
      <div className='pagination'>
        <Link to='/documentation'>&larr; Introduction</Link>
      </div>
    </div>
  )
}

export default class DocumentationPage extends React.Component {

  componentDidUpdate () {
    Prism.highlightAll()
  }

  render (): JSX.Element {

    return (
      <Template>
        <div className='table-of-content'>
          <h4 className='header'>Table of Content</h4>
          <ul className='sections'>
            <li className='active'>
              <Link to='/documentation'>Introduction</Link>
            </li>
            <li>
              <Link to='/documentation/api-documentation'>API Documentation</Link>
              <ul className='sub-sections'>
                <li><a href='#'>Getting health centres in a specific location</a></li>
                <li><a href='#'>Getting health care centres within a certain radius</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='doc-page-content'>
          <div className='inner'>
            <Switch>
              <Route key='doc-intro' exact path='/documentation/api-documentation' component={ApiDocumentationSection} />
              <Route key='doc-api' path='/documentation' component={IntroductionSection} />
            </Switch>
          </div>
        </div>
      </Template>
    )
  }
}
