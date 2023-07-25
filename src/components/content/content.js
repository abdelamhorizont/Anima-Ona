import * as React from "react";
import PropTypes from "prop-types";

import './content.scss'

export const HTMLContent = ({ content }) => (
  <div className='html-content' dangerouslySetInnerHTML={{ __html: content }} />
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;