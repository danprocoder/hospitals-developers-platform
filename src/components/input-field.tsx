import * as React from 'react'
import '../../public/scss/components/input-field.scss'

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
  if (focused) className.push('focused')

  return (
    <div className={className.join(' ')}>
      {/* <label>{props.label}</label> */}
      <br/>
      {props.isMultiline ? (
        <textarea
          value={props.value}
          onChange={onChange}
          onFocus={() => changeFocusedState(true)}
          onBlur={() => changeFocusedState(false)}
          placeholder={props.label}
        />
      ) : (
        <input
          type='text'
          value={props.value}
          onChange={onChange}
          onFocus={() => changeFocusedState(true)}
          onBlur={() => changeFocusedState(false)}
          placeholder={props.label}
        />
      )}
      {props.errorText && <span>{props.errorText}</span>}
    </div>
  )
}
