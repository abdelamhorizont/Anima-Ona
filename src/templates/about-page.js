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
        }
      }
    }
  }
}
  `)

  const { html } = data.allMarkdownRemark.edges[0].node
  
  useEffect(() => {
    console.log(html);
  }, [])


  return (
    // <Layout sites={data.allMarkdownRemark.edges} workpost={true} >
    <div className="about-page">
      <HTMLContent content={html} />
    </div>
    // </Layout>
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