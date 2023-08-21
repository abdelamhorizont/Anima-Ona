import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import PropTypes from "prop-types";
import ReactMarkdown from 'react-markdown'
import parse, { domToReact, attributesToProps } from 'html-react-parser';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper';

import './content.scss'


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

const ImageSection = ({ content, columns }) => {
  const [imgClick, setimgClick] = useState(false)


  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const gridclass = 'col-' + columns
  return (
    <div>
      <div className={`html-content ${gridclass}`}>

        {
          content?.images?.map(image => {
            const myimage = getImage(image)

            return (
              <div onClick={() => setimgClick(true)}>
                <GatsbyImage image={myimage} alt={''} />
                <p className="caption">Ausstellungsansicht 2022</p>
              </div>
            )
          })
        }

      </div>


      <div className="swiper-modal" style={{ display: imgClick ? 'flex' : 'none' }}>
        {/* <div className="background-blur"></div> */}

        <Swiper
          modules={[Navigation]}
          navigation={{
             nextEl: navigationNextRef.current,
             prevEl: navigationPrevRef.current
          }}
          onBeforeInit={(swiper) => {
             swiper.params.navigation.nextEl = navigationNextRef.current;
             swiper.params.navigation.prevEl = navigationPrevRef.current;
          }}
          loop
          // pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides
          className="swiper"
          onClick={() => setimgClick(false)}
        >
          {
            content?.images?.map(image => {
              const myimage = getImage(image)
              if(image != null){
                return (
                  <SwiperSlide className="swiper-slide" >
                    <div className="slide-img-wrapper">
                      <GatsbyImage
                        image={myimage}
                        imageStyle={{
                          objectFit: `contain`,
                          // maxHeight: '80%',
                          // width: 'auto' 
                          // height: '100%'
                        }}
                        Style={{
                          objectFit: `contain`,
                          // maxHeight: '80%',
                          // height: '80%' 
                        }}
                        alt={''}
                      />
                    </div>
                  </SwiperSlide>
                )
              }
            })
          }

          <div className="swiper-buttons">
            <div ref={navigationPrevRef} className="swiper-button-prev">  </div>
            <div ref={navigationNextRef} className="swiper-button-next"> </div>
          </div>
        </Swiper>

      </div>

    </div>
  )
}

export default ImageSection;
