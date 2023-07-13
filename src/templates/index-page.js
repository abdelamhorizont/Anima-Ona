import React from "react";
import { Link, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";

import Layout from "../components/layout/Layout";

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/typo.scss'

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const image = getImage(frontmatter.image) 

  return (
    <Layout>
      <h1 className="title">{frontmatter.title}</h1>
      <h2 className="subtitle">{frontmatter.subheading}</h2>
      <GatsbyImage
        image={image}
        alt=""
      />
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
`;
