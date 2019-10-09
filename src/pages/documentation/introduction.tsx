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
        <div className='pagination'>
          <Link to='/documentation/api-documentation'>API Documentation &rarr;</Link>
        </div>
      </div>
    </TableOfContent>
  )
}
