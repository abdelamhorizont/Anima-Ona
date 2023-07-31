import React, { useState } from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout/Layout";
import Content, { HTMLContent } from "../components/content/content";
import Projectlist from "../components/projectlist/projectlist";

// eslint-disable-next-line
// import '../styles/work-post.scss'

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const [hiddenTag, setHiddenTag] = useState(post.frontmatter.title)

  return (
    <Layout workpost={true} hiddenTag={hiddenTag}>
      
      <HTMLContent content={post.html} />
      <Projectlist />
      <div className="empty-page-fill"> </div>
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
