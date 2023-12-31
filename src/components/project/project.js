import { Link } from '@reach/router';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { getImage, GatsbyImage } from "gatsby-plugin-image";

function randomNumber(min, max) { // min and max included
    return (
        Math.floor(Math.random() * (max - min + 1) + min)
    )
}

export default function Project({ menuOpen, project, index, activeTag, workpost, hiddenTag }) {
    const myimage = getImage(project.node.frontmatter?.cover_image)

    const isBrowser = () => typeof window !== "undefined"
    const mobile = isBrowser() && window.screen.width < 720
    const windowWidth = isBrowser() && window.screen.width

    const marginTitle = React.useMemo(() => randomNumber(0, 30), [])
    const [imageShown, setImageShown] = useState(false);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -500px 0px" });

    const imgRef = useRef(null);
    const [imgWidth, setimgWidth] = useState(0)

    const textRef = useRef(null);
    const [textWidth, settextWidth] = useState(0)
    const [textPos, settextPos] = useState(0)

    useEffect(() => {
        // setimgWidth(myimage.width)

        setTimeout(() => {
            setimgWidth(imgRef.current?.clientWidth)
            settextWidth(textRef.current?.clientWidth)
            settextPos(textRef.current?.offsetLeft)
        }, "2000")
    }, [])

    const imageStyle = {
        opacity: imageShown ? 1 : 0,
        // left: ((marginTitle * 0.01 * windowWidth) - (myimage.width/2)  + 'px')
        // left: ((textPos + (textWidth / 2) - (imgWidth / 2)) + 'px')
        left: index % 2 == 0 ?
            ((marginTitle * 0.01 * windowWidth) - (myimage?.width / 2) + 'px')
            :
            (((windowWidth / 2) + (marginTitle * 0.01 * windowWidth)) - (myimage.width / 2) + 'px')
    }


    const [scrollY, setscrollY] = useState(0)
    const { scrollYProgress } = useScroll();
    const scrollLazy = useTransform(
        scrollYProgress,
        [0, 0.2 + index * 0.08],
        [150, 0]
    )

    useEffect(() => {
        workpost ? setscrollY(0) : setscrollY(scrollLazy)
    }, [scrollY])

    useEffect(() => {
        console.log(workpost);
    }, [])

    const projectStyle = {
        transition: "all 0.5s ease " + 0.4 + "s",
        opacity: menuOpen ? 1.0 : 0.0,
        marginTop: scrollY
    }

    return (
        <>
            <motion.li
                ref={ref}
                style={projectStyle}
                // style={{ marginTop: !workpost && 5 + 'vh' }}
                className={workpost && !menuOpen ? (hiddenTag != project.node.frontmatter.title && 'hidden-tag')
                    : (activeTag != 'All' && (!project.node.frontmatter.tags.includes(activeTag) && 'inactiveTag'))}>

                <Link
                    to={project.node.fields.slug}
                    onMouseEnter={() => setImageShown(true)}
                    onMouseLeave={() => setImageShown(false)}
                    style={{ marginLeft: marginTitle + 'vw' }}
                    className={workpost ? 'white' : 'black'}
                >

                    <h1 ref={textRef}>
                        {project.node.frontmatter.title}
                    </h1>

                    <h3> {project.node.frontmatter.date} </h3>

                </Link>

                {
                    !mobile &&
                    <div ref={imgRef} className='image-contaner' style={imageStyle}>
                        <GatsbyImage
                            image={myimage}
                            alt={''}
                            imageStyle={{
                                isolation: 'isolate'
                            }}
                        />
                    </div>
                }
            </motion.li>

        </>
    )
}
