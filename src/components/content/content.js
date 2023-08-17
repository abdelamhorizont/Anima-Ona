import * as React from "react";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
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

const MyImage = props => {
  const [fullSize, setFullSize] = useState(false);
  const handleClick = () => {
    setFullSize(true)
  }

  useEffect(() => {
    // console.log(fullSize)
  }, [fullSize])

  return (
    <img
      className={fullSize ? "large" : "small"}
      onClick={handleClick}
      {...props}
    />
  )
}

const Content = ({ content, columns }) => {
  const [imgArray, setimgArray] = useState([])
  const [imgClick, setimgClick] = useState(false)
  const inlineArray = []

  const componentRef = useRef();

  useEffect(() => {
    setimgArray(inlineArray)
  }, [inlineArray])

  useEffect(() => {
    componentRef.current.children[0].onClick = () => setimgClick(true)
    // console.log(componentRef.current.children[0])
    // console.log(componentRef.current.children[0]?.children[0])
  }, [componentRef])


  const gridclass = 'col-' + columns

  return (
    <div>
      <div ref={componentRef} className={`html-content ${gridclass}`} onClick={() => setimgClick(true)}>
        <ReactMarkdown
          components={{
            // p:  ({ node, children, ...props }) => {
            //   console.log(node.children[0].tagName);
            //   if (node.children[0].tagName === "img") {   
            //     return(
            //       <div className="myimages" onClick={() => setimgClick(true)}>{children}</div>
            //     )
            //   } else{
            //     return <p>{children}</p>
            //   }
            // }, 
            img: ({ node, ...props }) => {
              inlineArray.push({ node, ...props })
              return (
                <MyImage {...props} />
              )
            }
          }}
        >
          {content}

          {/* {
            parse(content, {
              replace: domNode => {
                console.log(domNode);
                if (domNode.name?.includes("p")) {
                  return (
                    domNode
                  )
                }
              }
            })  
          } */}
        </ReactMarkdown>
      </div>


      <div className="swiper-modal" style={{ display: imgClick ? 'flex' : 'none' }}>
        {/* <div className="background-blur"></div> */}

        <Swiper
          // modules={[Navigation, Pagination, A11y]}
          // navigation={{
          //    nextEl: navigationNextRef.current,
          //    prevEl: navigationPrevRef.current
          // }}
          // onBeforeInit={(swiper) => {
          //    swiper.params.navigation.nextEl = navigationNextRef.current;
          //    swiper.params.navigation.prevEl = navigationPrevRef.current;
          // }}
          loop={true}
          // pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className="swiper"
          style={{
            // "--swiper-pagination-color": "#fff",
            // "--swiper-navigation-color": "#fff",
            // "width": "80%",
            // "height": "80%",
            // zIndex: 20,
            // backdropFilter: 'blur(10px)'
            // "overflow": "hidden"
          }}
        >
          {imgArray.map((node, i) => {
            return (
              <SwiperSlide className="swiper-slide">
                <img src={node.src} alt="" />
              </SwiperSlide>
            )
          })}
        </Swiper>

      </div>

    </div>
  )
}

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
