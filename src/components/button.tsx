import * as React from 'react'
import '../../public/scss/components/button.scss'

interface ButtonProps {
  text: string,
  isLoading?: boolean,
  onClick?: () => void
}

export default (props: ButtonProps) => {
  const className = ['button']
  if (props.isLoading) className.push('loading')

  return (
    <button onClick={props.onClick} className={className.join(' ')} disabled={!!props.isLoading}>
      {props.text}
      {props.isLoading && <span>...</span>}
    </button>
  )
}
