import * as React from 'react'
import { withRouter } from 'react-router'
import * as Cookie from 'js-cookie'
import Template from './templates/default.tsx'
import InputField from '../components/input-field.tsx'
import Button from '../components/button.tsx'
import api, { ApiErrorResponse } from '../utils/http.ts'

class SignupPage extends React.Component<any> {
  static contextTypes = {}

  state = {
    userData: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    },
    formError: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    },
    isSendingData: false
  }

  handleFormErrors (errors: any): void {
    const formError: any = {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }

    for (const key in errors) {
      formError[key] = errors[key]
    }

    this.setState({ formError })
  }

  signUpBtnListener (): void {
    this.setState({ isSendingData: true })

    api.post('/user', this.state.userData)
      .then((response: any) => {
        this.setState({ isSendingData: false })

        Cookie.set('user-token', response.data.data.token, { expires: 1 })
        this.props.history.push('/dashboard')
      })
      .catch((err: ApiErrorResponse) => {
        this.setState({ isSendingData: false })

        if (err.response) {
          const { data: { errors } } = err.response.data
          this.handleFormErrors(errors)
        }
      })
  }

  onFieldValueChanged (field: string, value: string): void {
    this.setState({
      userData: {
        ...this.state.userData,
        [field]: value
      }
    })
  }

  render (): JSX.Element {
    const { isSendingData, formError } = this.state

    return (
      <Template>
        <div>
          <h4>Create an Account</h4>
          <div>
            <div>
              <InputField
                label='Firstname'
                errorText={formError.firstname}
                onChange={(value: string) => this.onFieldValueChanged('firstname', value)}
              />
              <InputField
                label='Lastname'
                errorText={formError.lastname}
                onChange={(value: string) => this.onFieldValueChanged('lastname', value)}
              />
            </div>
            <div>
              <InputField
                label='Email Address'
                errorText={formError.email}
                onChange={(value: string) => this.onFieldValueChanged('email', value)}
              />
            </div>
            <div>
              <InputField
                label='Password'
                errorText={formError.password}
                onChange={(value: string) => this.onFieldValueChanged('password', value)}
              />
            </div>
            <div>
              <Button
                text='Sign Up'
                onClick={() => this.signUpBtnListener()}
                isLoading={isSendingData}
              />
            </div>
          </div>
        </div>
      </Template>
    )
  }
}

export default withRouter(SignupPage)
