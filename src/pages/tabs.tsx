import React from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'

export default () => {
  const { tabs }: { tabs: string[] } = useRouteData()

  return (
    <div>
      <h1>My tabs collection</h1>
      <br />
      All tabs:
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
