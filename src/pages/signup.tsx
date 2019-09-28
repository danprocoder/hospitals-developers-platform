import * as React from 'react'
import { withRouter } from 'react-router'
import * as Cookie from 'js-cookie'
import Template from './templates/default'
import InputField from '../components/input-field'
import Button from '../components/button'
import api, { ApiErrorResponse } from '../utils/http'
import '../../public/scss/pages/user-auth.scss'

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
        <div className='user-auth'>
          <h4 className='user-auth-header'>Create an Account</h4>
          <div className='user-auth-form'>
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
                type='password'
              />
            </div>
            <div className='button-container'>
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
