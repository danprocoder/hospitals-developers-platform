import * as React from 'react'

interface InputFieldProps {
  isMultiline?: false,
  type?: string
}

export default (props: InputFieldProps) => {
  if (props.isMultiline) {
    return <textarea></textarea>
  }

  return <input type="text" />
}
