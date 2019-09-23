import * as React from 'react'

interface InputFieldProps {
  isMultiline?: boolean,
  type?: string,
  label?: string,
  errorText?: string,
  onChange?: (value: string) => void
}

export default (props: InputFieldProps) => {
  const [value, setValue] = React.useState('')

  function onChange (event: any) {
    setValue(event.target.value)

    if (props.onChange) {
      props.onChange(event.target.value)
    }
  }

  return (
    <div>
      <label>{props.label}</label>
      <br/>
      {props.isMultiline ? (
        <textarea value={value} onChange={onChange} />
      ) : (
        <input type='text' value={value} onChange={onChange} />
      )}
      {props.errorText && <span>{props.errorText}</span>}
    </div>
  )
}
