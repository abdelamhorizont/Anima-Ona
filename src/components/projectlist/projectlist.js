import React, { useEffect, useState } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby";

import Project from '../project/project'
import './projectlist.scss'


export default function Projectlist({ handleMenu, menuOpen, workpost, hiddenTag }) {
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

  const isBrowser = () => typeof window !== "undefined"
  const mobile = isBrowser() && window.screen.width < 720

  const [activeTag, setactiveTag] = useState('All')
  const [tagChange, settagChange] = useState(false)
  // const [menuOpen, setMenuOpen] = useState(menuOpen)


  const tags = ["All", "Object", "Space", "Research", "Exhibition"]
  const projectlist = data.allMarkdownRemark.edges

  const projectlistStyle = {
    display: menuOpen && mobile ? 'block' : 'flex',
    height: menuOpen ? 'auto' : '0px' 
  }

  return (
    <div className='menu'>
      <div className='tags' style={{ marginBottom: menuOpen ? '2rem' : '0rem' }}>
        {
          tags.map(tag => {
            return (
              <div>
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
                  }}
                >{tag}</button>
              </div>
            )
          })
        }
      </div>

      <ul className={'projectlist'} style={projectlistStyle}>
      {/* <ul className={menuOpen ? 'projectlist flex-block' : 'projectlist hidden'}> */}

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
              />
            )
          })
        }
      </ul>
    </div>
  )
}
