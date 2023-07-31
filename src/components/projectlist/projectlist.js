import React, { useEffect, useState } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby";

import Project from '../project/project'
import './projectlist.scss'

function randomNumber(min, max) { // min and max included
  return (
    Math.floor(Math.random() * (max - min + 1) + min)
  )
}

export default function Projectlist({ workpost, hiddenTag }) {
  const data = useStaticQuery(graphql`
query {
  allMarkdownRemark(
    filter: {frontmatter: {templateKey: {eq: "work-post"}}}
    sort: {fields: frontmatter___date, order: DESC}
    ) {
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
  const [tagChange, settagChange] = useState(false)

  const tags = ["All", "Object", "Space", "Research", "Exhibition"]
  const projectlist = data.allMarkdownRemark.edges

  // useEffect(() => {
  //   settagChange(true)
  // }, [activeTag])
  

  return (
    <>
      <div className='tags'>
        {
          tags.map(tag => {
            return (
              <button
                className={tag != activeTag && 'inactiveTag'}
                onClick={() => {
                  setactiveTag(tag)
                  settagChange(true)
                }}
                onMouseEnter={() => {
                  setactiveTag(tag)
                  settagChange(true)
                }} 
              >{tag}</button>
            )
          })
        }
      </div>

      <ul className='projectlist'>
        {
          projectlist.map((project, i) => {
            return (
              <Project project={project} activeTag={activeTag} workpost={!tagChange && workpost} hiddenTag={hiddenTag} />
            )
          })
        }
      </ul>
    </>
  )
}
