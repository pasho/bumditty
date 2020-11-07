import axios from 'axios'
import path from 'path'
import fs from 'fs'

const loadTabs = () => {
  try{
    console.log('loading tabs')
    const tabFiles = fs.readdirSync('./tabs').filter(file => file.endsWith('.md'))
    console.log(`got ${tabFiles.length} files`)
    const tabs = tabFiles.map(tabFile => {
      console.log(`loading ${tabFile}`)
      const tabData = fs.readFileSync(path.join('./tabs', tabFile), 'utf8').toString();
      console.log(`got ${tabData.length} chars`)
      return {[tabFile]: tabData}
    })
    .reduce((acc, tabFileData) => ({...acc, ...tabFileData}), {})
    // console.log(tabs)
    return tabs;
  }
  catch(error){
    console.error(error)
    return {};
  }
}

// Typescript support in static.config.js is not yet supported, but is coming in a future update!

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    const { data: posts } /* :{ data: Post[] } */ = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    )
    const tabs = loadTabs();
    return [
      {
        path: '/tabs',
        getData: () => ({ tabs: Object.keys(tabs) }),
        children: Object.keys(tabs).map(
          fileName => ({
            path: `/${fileName}`,
            template: 'src/containers/Tab',
            getData: () => ({
              fileName,
              data: tabs[fileName]
            })
          })
        )
      }
    ]
  },
  plugins: [
    'react-static-plugin-typescript',
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
    [require.resolve('react-static-plugin-file-watch-reload'),
      {
        paths: ['tabs/*.*'],
      }]
  ],
}
