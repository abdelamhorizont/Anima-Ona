import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby";

import './projectlist.scss'

function randomNumber(min, max) { // min and max included
  return (
    Math.floor(Math.random() * (max - min + 1) + min)
  )
}

export default function Projectlist() {
  const data = useStaticQuery(graphql`
query {
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "work-post"}}}) {
    edges {
      node {
        frontmatter {
          title
          date(formatString: "YYYY")
          featuredimage
          tags
        }
      }
     }
   }
  }
`)

  const [activeTag, setactiveTag] = useState('All')

  const tags = ["All", "Object", "Space", "Research", "Exhibition"]

  const projectlist = data.allMarkdownRemark.edges

  const marginTitle = React.useMemo(() =>
    [...new Array(projectlist.length)].map(() => randomNumber(0, 30)),[])

  return (
    <>
      <div className='tags'>
        {
          tags.map(tag => {
            return (
              <button
                // className={activeTag != 'All' && (tag != activeTag && 'inactiveTag')}
                className={tag != activeTag && 'inactiveTag'}
                onClick={() => setactiveTag(tag)}
              >{tag}</button>
            )
          })
        }
      </div>

      <ul className='projectlist'>
        {
          projectlist.map((project, i) => {
            return (
              <li className={activeTag != 'All' && (!project.node.frontmatter.tags.includes(activeTag) && 'inactiveTag')}>
                <h1 style={{ marginLeft: marginTitle[i] + 'vw' }}>
                  {project.node.frontmatter.title}
                </h1>
                <h3>
                  {project.node.frontmatter.date}
                </h3>
                <img src={'../../' + project.node.frontmatter.featuredimage} alt="" />
              </li>
            )
          })
        }
      </ul>
    </>
  )
}
