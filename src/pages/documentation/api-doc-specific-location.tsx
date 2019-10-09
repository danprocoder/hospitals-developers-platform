import * as React from 'react'
import { Link } from 'react-router-dom'
import TableOfContent from './table-of-content'
import CodeCard, { CodeCardTabContent } from '../../components/code-card'
import CopyButton from '../../components/copy-button'
import ScrollSpy from '../../components/scrollspy'

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
  return (
    <div className='url-container'>
      <span className='method'>{props.method.toUpperCase()}</span>
      <span className='url'>{props.url}</span>
      <CopyButton
        successMessage='URL copied to clipboard'
        text={props.url}
      />
    </div>
  )
}

type CodeViewProps = { code: string, rawCode: string }
function CodeView (props: CodeViewProps) {
  const code = props.code.trim()
  const rawCode = props.rawCode.trim()

  const numLines: number = rawCode.split(/\n/).length

  return (
    <div className='code-view'>
      <div className='lines'>
        {Array.from(Array(numLines), (e: any, line: number) => <div key={'line' + line}>{line + 1}</div>)}
      </div>
      <div className='code'>
        <code className='language-javascript'>{code}</code>
      </div>
      <CopyButton successMessage='Example code copied to clipboard' text={rawCode} />
    </div>
  )
}

export default function () {
  return (
    <TableOfContent active='api-docs-specific-location'>
      <div className='page api-doc'>
        <h2 className='header'>Getting health centres in a specific location</h2>
        <div className='content'>
          <div className='section'>
            <ScrollSpy spyOn={['url', 'url-parameters', 'example']} menuListId='menu-specific-location'>
              <div>
                <div className='api-url' id='url'>
                  <URL
                    method='get'
                    url='http://api.nigeriahealthcarecentres.com/api/v1/hospitals'
                  />
                </div>
                <div className='url-params' id='url-parameters'>
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
                <div className='code-card-container' id='example'>
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
            </ScrollSpy>
          </div>
        </div>
        <div className='pagination prev-next'>
          <Link to='/documentation'>&larr; Introduction</Link>
          <Link to='/documentation/api-doc/nearby'>Getting health centres within a certain radius &rarr;</Link>
        </div>
      </div>
    </TableOfContent>
  )
}
