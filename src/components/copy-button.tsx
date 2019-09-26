import * as React from 'react'
import * as Toastr from 'toastr'
import { copyToClipboard } from '../utils/clipboard'
import { Copy } from 'react-feather'

interface CopyButtonProps {
  successMessage: string,
  text: string
  className?: string
}
export default (props: CopyButtonProps) => {
  function copy (): void {
    copyToClipboard(props.text)
    Toastr.success(props.successMessage)
  }

  const className = ['copy-btn']
  if (props.className) {
    className.push(props.className)
  }

  return (
    <button className={className.join(' ')} onClick={copy}>
      <Copy />
    </button>
  )
}
