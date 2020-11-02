import React from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'
import ReactMarkdown from 'react-markdown'

export default () => {
  const { data }: { fileName: string, data: string } = useRouteData()
  return (
    <div>
      <Link to="/tabs/">{'<'} Back</Link>
      <br />
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  )
}
