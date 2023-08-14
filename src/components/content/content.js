import * as React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from 'react-markdown'

import './content.scss'

export const HTMLContent = ({ content }) => (
  <div className='html-content' dangerouslySetInnerHTML={{ __html: content }} />
);

const Content = ({ content, columns }) => {
  const gridclass =  'col-' + columns 

  return (
    <div className={`html-content ${gridclass}`}>
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  )
}

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
