import * as React from 'react'
import { withRouter } from 'react-router'
import * as Cookie from 'js-cookie'
import Template from './templates/default'
import InputField from '../components/input-field'
import Button from '../components/button'
import api, { ApiErrorResponse } from '../utils/http'

class LoginPage extends React.Component<any> {

  state = {
    authError: '',
    userData: {
      email: '',
      password: ''
    },
    isAuthenticating: false
  }

  authenticateUser () {
    this.setState({ isAuthenticating: true })

    api
      .post('/user/auth', this.state.userData)
      .then((response: any) => {
        this.setState({ isAuthenticating: false })

        const { token } = response.data.data
        Cookie.set('user-token', token, { expires: 1 })
        this.props.history.push('/dashboard')
      })
      .catch((error: ApiErrorResponse) => {
        this.setState({ isAuthenticating: false })

        const { response } = error
        if (response) {
          if (response.status === 401) {
            this.setState({ authError: 'Incorrect username/password combination' })
          }
        }
      })
  }

  onFieldValueChanged (field: string, value: string) {
    this.setState({
      userData: {
        ...this.state.userData,
        [field]: value
      }
    })
  }

  render (): JSX.Element {
    const { authError, isAuthenticating } = this.state

    return (
      <Template>
        <h4>Log In</h4>
        {authError && <div>{authError}</div>}
        <div>
          <InputField
            label='Your Email Address'
            onChange={(value: string) => this.onFieldValueChanged('email', value)}
          />
          <InputField
            label='Your Password'
            onChange={(value: string) => this.onFieldValueChanged('password', value)}
          />
          <Button
            text='Log In'
            onClick={() => this.authenticateUser()}
            isLoading={isAuthenticating}
          />
        </div>
      </Template>
    )
  }
}

export default withRouter(LoginPage)
