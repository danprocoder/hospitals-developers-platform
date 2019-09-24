import * as React from 'react'
import { withRouter } from 'react-router'
import * as Toastr from 'toastr'
import * as Cookie from 'js-cookie'
import { Copy as CopyIcon } from 'react-feather'
import api, { ApiErrorResponse } from '../../utils/http'
import Template from './templates/default'

Toastr.options.timeOut = 1000

const userToken = Cookie.get('user-token')

function copyToClipboard (apiKey: string) {
  const input = document.createElement('input')
  input.value = apiKey
  document.body.appendChild(input)

  input.select()
  document.execCommand('copy')

  document.body.removeChild(input)

  Toastr.success('API key copied to clipboard')
}

function UserDashboard (): JSX.Element {
  const [apiKeys, setApiKeys] = React.useState([])

  function loadApiKeys (): void {
    api
      .get('user/key', {
        headers: { authorization: `Bearer ${userToken}` }
      })
      .then((response: any) => {
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
                  <span>{key.apiKey}</span>
                  <button onClick={() => copyToClipboard(key.apiKey)}>
                    <CopyIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Template>
  )
}

export default withRouter(UserDashboard)
