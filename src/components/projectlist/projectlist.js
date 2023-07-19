import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby";

import Project from '../project/project'
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
        fields {
          slug
        }
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
              <Project project={project} activeTag={activeTag} />
            )
          })
        }
      </ul>
    </>
  )
}
