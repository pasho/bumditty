import React from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'

export default () => {
  const { fileName, data }: { fileName: string, data: string } = useRouteData()
  return (
    <div>
      <Link to="/blog/">{'<'} Back</Link>
      <br />
      <h3>{fileName}</h3>
      <p>{data}</p>
    </div>
  )
}
