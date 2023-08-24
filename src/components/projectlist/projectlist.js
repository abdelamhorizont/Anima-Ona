import React, { useEffect, useState } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby";

import Project from '../project/project'
import './projectlist.scss'

function randomNumber(min, max) { // min and max included
  return (
    Math.floor(Math.random() * (max - min + 1) + min)
  )
}

export default function Projectlist({sites, handleMenu, menuOpen, workpost, hiddenTag, scrollLazy }) {
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
          cover_image {
            childImageSharp {
              gatsbyImageData
            }
          }
          tags
        }
      }
     }
   }
  }
`)

  // const [menuOpen, setMenuOpen] = useState(!workpost)

  const [activeTag, setactiveTag] = useState('All')
  const [tagChange, settagChange] = useState(false)

  const tags = ["All", "Object", "Space", "Research", "Exhibition"]
  // const projectlist = sites[0]
  const projectlist = data.allMarkdownRemark.edges 

  useEffect(() => {
    // console.log(sites);
    // console.log(projectlist);
  }, [])

  return (
    <div className='menu'>
      <div className='tags' style={{ opacity: menuOpen ? 1 : 1 }}>
        {
          tags.map(tag => {
            return (
              <button
                className={tag != activeTag && 'inactiveTag'}
                onClick={() => {
                  setactiveTag(tag)
                  settagChange(true)
                  handleMenu(true)
                }}
                onMouseEnter={() => {
                  setactiveTag(tag)
                  settagChange(true)
                  handleMenu(true)
                  // setMenuOpen(true)
                }}
              >{tag}</button>
            )
          })
        }
      </div>

      <ul className='projectlist' style={{ display: menuOpen ? 'flex' : 'none' }}>
        {
          projectlist.map((project, i) => {
            return (
              <Project
                menuOpen={menuOpen}
                project={project}
                index={i}
                activeTag={activeTag}
                workpost={!tagChange && workpost}
                hiddenTag={hiddenTag}
                scrollLazy={scrollLazy}
              />
            )
          })
        }
      </ul>
    </div>
  )
}
