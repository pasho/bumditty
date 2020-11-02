import React from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'

export default () => {
  const { tabs }: { tabs: string[] } = useRouteData()

  return (
    <div>
      <h1>It's blog time.</h1>
      <br />
      All Posts:
      <ul>
        {tabs.map(tab => (
          <li key={tab}>
            <Link to={`/tabs/${tab}/`}>{tab}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
