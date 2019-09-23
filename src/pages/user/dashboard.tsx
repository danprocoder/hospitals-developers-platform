import * as React from 'react'
import { withRouter } from 'react-router'
import * as Cookie from 'js-cookie'
import { Copy as CopyIcon } from 'react-feather'
import api, { ApiErrorResponse } from '../../utils/http.ts'
import Template from './templates/default.tsx'

const userToken = Cookie.get('user-token')

function UserDashboard (props: any): JSX.Element {
  const [apiKeys, setApiKeys] = React.useState([])

  function loadApiKeys (): void {
    api
      .get('user/key', {
        headers: { authorization: `Bearer ${userToken}` }
      })
      .then((response: any) => {
        console.log(response.data.data)
        setApiKeys(response.data.data)
      })
      .catch((error: ApiErrorResponse) => console.error(error.response))
  }

  React.useEffect(() => {
    loadApiKeys()
  }, [])

  return (
    <Template>
      <div>
        <h4>My Access Tokens</h4>
        <div>
          {apiKeys.map((key, index) => (
            <div key={index}>
              <div>{key.project}</div>
              <div>
                {key.apiKey}
                <a href='#'>
                  <CopyIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Template>
  )
}

export default withRouter(UserDashboard)
