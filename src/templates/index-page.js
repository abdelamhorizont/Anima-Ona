import React from "react";
import { Link, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion } from "framer-motion"

import Layout from "../components/layout/Layout";
import Projectlist from "../components/projectlist/projectlist";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const image = getImage(frontmatter.image)

  return (
    <Layout>
      <motion.div
        className="landing-anim"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <GatsbyImage
          image={image}
          alt=""
          className="landing-image"
        />
        <div className="landing-text-wrapper">
          <div className="landing-text">
            <h1 className="title">{frontmatter.title}</h1>
            <h2 className="subtitle">{frontmatter.subheading}</h2>
          </div>
        </div>
      </motion.div>

      {/* tags */}
      {/* projectlist */}
      <Projectlist /> 
      

      {/* cookies */}
    </Layout>
  );
};


export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
      }
    }
  }
`
