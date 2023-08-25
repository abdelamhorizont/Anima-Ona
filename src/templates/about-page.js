import React, { useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion"

import Layout from "../components/layout/Layout";
import { HTMLContent } from "../components/content/text-section";

// import Tags from "../components/tags/tags";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'

const AboutPage = () => {
  const data = useStaticQuery(graphql`
  query {
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "about-page"}}}) {
    edges {
      node {
        html
        frontmatter {
          title
          anima_ona_image {
            caption
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          listedInfos {
            column {
              title
              list {
                listElement {
                  year
                  title
                  location
                  link {
                    link
                    linkText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  `)

  const { html } = data.allMarkdownRemark.edges[0].node
  const picture = data.allMarkdownRemark.edges[0].node.frontmatter.anima_ona_image
  const list = data.allMarkdownRemark.edges[0].node.frontmatter.listedInfos
  const myimage = getImage(picture.image)

  useEffect(() => {
    console.log(list.column);
  }, [])


  return (
    <div className="about-page">
      <div className="about-page-image">
        <GatsbyImage
          image={myimage}
          alt={''}
          style={{
            objectFit: `contain`,
            width: '66.6%',
            margin: '1.5rem',
            marginTop: '0',
            isolation: 'isolate'
          }}
        />
        {/* <p className="caption">{picture.caption}</p> */}
      </div>

      <HTMLContent content={html} />

      <div className="html-content">
        <ul>
          {
            list?.map(list => {
              return (
                <li>
                  <h1>
                    {list?.column?.title}
                  </h1>
                  <ul>
                    {
                      list?.column?.list?.map(list => {
                        return (
                          <li>
                            {list?.listElement?.year &&
                              <div className="list-year">{list?.listElement?.year}</div>
                            }
                            {list?.listElement?.title &&
                              <div className="list-text">
                                <div> {list?.listElement?.title}</div>
                                <div className="list-text-small">
                                  {list?.listElement?.location &&
                                    <div className="list-location"> {list?.listElement?.location}</div>
                                  }
                                  {list?.listElement?.link &&
                                    <a className="list-link" href={list?.listElement?.link?.link}>{list?.listElement?.link?.linkText}</a>
                                  }
                                </div>
                              </div>
                            }
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>

    </div>
  )
}



export default AboutPage;

// export const aboutPageQuery = graphql`
//   query AboutPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//     allMarkdownRemark(
//       filter: {frontmatter: {templateKey: {eq: "work-post"}}}
//       sort: {fields: frontmatter___date, order: DESC}
//     ) {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             date(formatString: "YYYY")
//             tags
//             featuredimage
//           }
//         }
//       }
//     }
//   }
// `;