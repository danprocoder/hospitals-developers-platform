import * as React from 'react'

interface ButtonProps {
  text: string,
  isLoading?: boolean,
  onClick?: () => void
}

export default (props: ButtonProps) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
      {props.isLoading && <span>...</span>}
    </button>
  )
}
