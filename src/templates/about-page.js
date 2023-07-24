import React from "react";
import { Link, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion"

import Layout from "../components/layout/Layout";
import Content, { HTMLContent } from "../components/content/content";

// import Tags from "../components/tags/tags";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'

const AboutPage = ({ data }) => {
  const { html } = data.markdownRemark

  return (
    <Layout>
      <HTMLContent content={html} />
    </Layout>
  )
}



export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;