import React, { useEffect, useState } from "react";
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
  const image = getImage(frontmatter.landingvideo)
  const videoUrl = frontmatter.video.videoFile.publicURL
  const [scrollY, setscrollY] = useState(0)

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

  useEffect(() => {
    setscrollY(scrollLazy)
  }, [scrollLazy])

  // console.log(scrollYProgress);

  return (
    <>
      <motion.div
        className="landing-anim"
        style={{ opacity: scrollOpacity, filter: scrollBlur }}
      >
        {/* <GatsbyImage
          image={image}
          alt=""
          className="landing-image"
        /> */}

        <video key={videoUrl} muted autoPlay loop webkit-playsinline="true" playsInline>
          <source src={videoUrl} type="video/mp4" />
        </video>


        <div className="landing-text-wrapper">
          <div className="landing-text">
            <h1 className="title">{frontmatter.title}</h1>
            <h2 className="subtitle">{frontmatter.subheading}</h2>
          </div>
        </div>
      </motion.div>

      <div className="empty-page-fill" style={{ height: '70vh' }}> </div>

      <motion.div>
        <Layout>
          {/* cookies */}
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
        landingvideo {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        video {
          videoFile {
            publicURL
          }
        }
        heading
        subheading
      }
    }
  }
`
