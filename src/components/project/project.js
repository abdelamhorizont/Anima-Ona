import { Link } from '@reach/router';
import React, { useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"

function randomNumber(min, max) { // min and max included
    return (
        Math.floor(Math.random() * (max - min + 1) + min)
    )
}

export default function Project({ project, activeTag, workpost, hiddenTag }) {
    const isBrowser = () => typeof window !== "undefined"
    const mobile = isBrowser() && window.screen.width < 720


    const marginTitle = React.useMemo(() => randomNumber(0, 30), [])
    const [imageShown, setImageShown] = useState(false);

    // const hiddenTag = "Liquid Sandstone Stool"

    return (
        <motion.div>
            <li className={workpost ? (hiddenTag != project.node.frontmatter.title && 'hidden-tag') 
            : (activeTag != 'All' && (!project.node.frontmatter.tags.includes(activeTag) && 'inactiveTag'))}>
                <Link
                    to={project.node.fields.slug}
                    onMouseEnter={() => setImageShown(true)}
                    onMouseLeave={() => setImageShown(false)}
                    style={{ marginLeft: marginTitle + 'vw' }}
                >

                    <h1>
                        {project.node.frontmatter.title}
                    </h1>

                    <h3> {project.node.frontmatter.date} </h3>

                </Link>

                {
                    !mobile &&
                    <div className='image-contaner' style={{ opacity: imageShown ? 1 : 0 }}>
                        <img src={"" + project.node.frontmatter.featuredimage} alt="" />
                    </div>
                }
            </li>

        </motion.div>
    )
}
