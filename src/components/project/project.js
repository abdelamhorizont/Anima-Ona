import { Link } from '@reach/router';
import React, { useState } from 'react'

function randomNumber(min, max) { // min and max included
    return (
        Math.floor(Math.random() * (max - min + 1) + min)
    )
}

export default function Project({ project, activeTag }) {


    const marginTitle = React.useMemo(() => randomNumber(0, 30), [])

    const [imageShown, setImageShown] = useState(false);
    // console.log(activeTag);

    return (
        <>
            <li className={activeTag != 'All' && (!project.node.frontmatter.tags.includes(activeTag) && 'inactiveTag')}>
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

                <div className='image-contaner' style={{ opacity: imageShown ? 1 : 0 }}>
                    <img src={"" + project.node.frontmatter.featuredimage} alt="" />
                </div>
            </li>

        </>
    )
}
