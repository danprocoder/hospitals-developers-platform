import * as React from 'react'
import { Eye, EyeOff } from 'react-feather'
import '../../public/scss/components/input-field.scss'

type InputProps = {
  type?: string,
  label?: string,
  onChange?: (event: any) => void,
  value?: string,
  changeFocusedState?: React.Dispatch<any>
}
const InputField = (props: InputProps) => {
  const [passwordRevealed, setPasswordRevealed] = React.useState(false)

  let inputType = 'text' // Default
  if (props.type) {
    if (props.type === 'password') {
      inputType = props.type === 'password' && passwordRevealed
        ? 'text'
        : 'password'
    } else {
      inputType = props.type
    }
  }

  return (
    <div className='field-wrapper'>
      <input
        type={inputType}
        value={props.value}
        onChange={props.onChange}
        onFocus={() => props.changeFocusedState(true)}
        onBlur={() => props.changeFocusedState(false)}
        placeholder={props.label}
      />
      {props.type === 'password' && (
        <button
          onClick={(event: any) => setPasswordRevealed(!passwordRevealed)}
          className='right-option'
        >
          {inputType === 'password'
            ? <Eye />
            : <EyeOff />}
        </button>
      )}
    </div>
  )
}

interface InputFieldProps {
  isMultiline?: boolean,
  type?: string,
  label?: string,
  errorText?: string,
  onChange?: (value: string) => void,
  value?: string
}
export default (props: InputFieldProps) => {
  const [focused, changeFocusedState] = React.useState(false)

  const onChange = (event: any) => {
    const { value } = event.target

    if (props.onChange) {
      props.onChange(value)
    }
  }

  const className = ['input-field']
  if (props.errorText) className.push('error')
  else if (focused) className.push('focused')

  return (
    <div className={className.join(' ')}>
      {props.isMultiline ? (
        <textarea
          value={props.value}
          onChange={onChange}
          onFocus={() => changeFocusedState(true)}
          onBlur={() => changeFocusedState(false)}
          placeholder={props.label}
        />
      ) : (
        <InputField
          {...props}
          onChange={onChange}
          changeFocusedState={changeFocusedState}
        />
      )}
      {props.errorText && <div className='error-text'>{props.errorText}</div>}
    </div>
  )
}
