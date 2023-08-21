import React from "react";
import { Link, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

import Layout from "../components/layout/Layout";
import Projectlist from "../components/projectlist/projectlist";
// import Tags from "../components/tags/tags";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

import '../styles/index.scss'

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const image = getImage(frontmatter.image)

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress)

  const scrollOpacity = useTransform(
    useSpring(scrollYProgress),
    [0, 1],
    [1, 0]
  )
  const scrollBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ['blur(0px)', 'blur(10px)']
  )

  const scrollLazy = useTransform(
    useSpring(scrollYProgress),
    [0, 1],
    [0, 5]
)
  // console.log(scrollYProgress);

  return (
    <>
      <motion.div
        className="landing-anim"
        // initial={{ 
        //   opacity: 1, 
        //   filter: 'blur(0px)'
        // }}
        // animate={{
        //   opacity: 0, 
        //   filter: 'blur(10px)',
        //   transitionEnd: {
        //     display: "none",
        //   },
        // }}
        // transition={{ duration: 1.5, delay: 1 }}
        style={{ opacity: scrollOpacity, filter: scrollBlur }}
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

      <div className="empty-page-fill" style={{height: '500px'}}> </div>
    
      <motion.div>
        <Layout scrollLazy={scrollLazy}>
          {/* cookies */}
          <div className="empty-page-fill" style={{height: '49vh'}}> </div>
        </Layout>
      </motion.div>
    </>
  )
}


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
