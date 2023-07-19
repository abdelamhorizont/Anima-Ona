import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
     <HTMLContent content={post.html} />
    </Layout>
  )
}


export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        featuredimage
      }
    }
  }
`
