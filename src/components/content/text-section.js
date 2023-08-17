import * as React from "react";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown'
import parse, { domToReact, attributesToProps } from 'html-react-parser';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper';

import './content.scss'
import 'swiper/css'
// import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export const HTMLContent = ({ content }) => (
  <div className='html-content' dangerouslySetInnerHTML={{ __html: content }} />
);


const TextSection = ({ content, columns }) => {
  const gridclass = 'col-' + columns

  return (
      <div className={`html-content ${gridclass}`}>
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
  )
}


export default TextSection;
