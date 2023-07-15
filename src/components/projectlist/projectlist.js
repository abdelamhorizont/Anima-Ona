import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby";

import './projectlist.scss'

export default function Projectlist() {
  const data = useStaticQuery(graphql`
query {
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "work-post"}}}) {
    edges {
      node {
        frontmatter {
          title
          date(formatString: "YYYY")
        }
      }
     }
   }
  }
`)

  const [activeTag, setactiveTag] = useState('All')

  const tags = ["All", "Object", "Space", "Research", "Exhibition"]

  const projectlist = data.allMarkdownRemark.edges

  return (
    <>
      <div className='tags'>
        {
          tags.map(tag => {
            return (
              <button 
              className={tag != activeTag && 'inactiveTag'}
              onClick={() => setactiveTag(tag)}
              >{tag}</button>
            )
          })
        }
      </div>

      <ul className='projectlist'>
        {
          projectlist.map(project => {
            return (
              <li>
                <h1>
                  {project.node.frontmatter.title}
                </h1>
                <h3>
                  {project.node.frontmatter.date}
                </h3>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}
