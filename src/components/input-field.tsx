import * as React from 'react'

interface InputFieldProps {
  isMultiline?: boolean,
  type?: string,
  label?: string,
  errorText?: string,
  onChange?: (value: string) => void,
  value?: string
}

export default (props: InputFieldProps) => {

  const onChange = (event: any) => {
    const { value } = event.target

    if (props.onChange) {
      props.onChange(value)
    }
  }

  return (
    <div>
      <label>{props.label}</label>
      <br/>
      {props.isMultiline ? (
        <textarea value={props.value} onChange={onChange} />
      ) : (
        <input type='text' value={props.value} onChange={onChange} />
      )}
      {props.errorText && <span>{props.errorText}</span>}
    </div>
  )
}
