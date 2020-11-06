import React, { useEffect, useRef } from 'react'
import { useRouteData } from 'react-static'
import { Link } from '@reach/router'
// import ReactMarkdown from 'react-markdown'
import MarkdownIt from 'markdown-it';
const MarkdownItMusic = require("markdown-it-music");

const markDownRenderer = MarkdownIt().use(MarkdownItMusic);

export default () => {
  const { data }: { fileName: string, data: string } = useRouteData();
  const markdownContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const html = markDownRenderer.render(data);
    markdownContainer.current.innerHTML = html;

  }, [data]);
  
  return (
    <div>
      <Link to="/tabs/">{'<'} Back</Link>
      <br />
      {/* <ReactMarkdown plugins={[]}>{data}</ReactMarkdown> */}
      <div ref={markdownContainer}></div>
    </div>
  )
}
