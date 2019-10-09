import * as React from 'react'
import { Link } from 'react-router-dom'
import TableOfContent from './table-of-content'

export default function () {
  return (
    <TableOfContent active='introduction'>
      <div className='page introduction'>
        <h2 className='header'>Introduction</h2>
        <div className='content'>
          <Link to='/signup'>Get your API key</Link>
        </div>
        <div className='pagination next-only'>
          <Link to='/documentation/api-doc/specific-location'>Getting health centres in a specific location &rarr;</Link>
        </div>
      </div>
    </TableOfContent>
  )
}
