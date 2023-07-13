import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby";

import './projectlist.scss'

export default function Projectlist() {
    const data = useStaticQuery(graphql`
query {
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
    edges {
      node {
        frontmatter {
          title
        }
      }
     }
   }
  }
`)

    const projectlist = data.allMarkdownRemark.edges

    return (
        <ul className='projectlist'>
            {
                projectlist.map(project => {
                    return (
                        <li>
                            {project.node.frontmatter.title}
                        </li>
                    )
                })
            }
        </ul>
    )
}
