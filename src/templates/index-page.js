import React from "react";
import { Link, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const image = getImage(frontmatter.image) ;

  return (
    <Layout>
      <h1 className="title">{frontmatter.title}</h1>
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
