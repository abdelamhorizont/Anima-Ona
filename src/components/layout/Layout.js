import React, { useState } from "react";
import { Helmet } from "react-helmet";

import useSiteMetadata from "../SiteMetadata";
import { withPrefix, Link } from "gatsby";

import Projectlist from "../projectlist/projectlist";

import './layout.scss'

const Layout = ({ children, workpost, hiddenTag, scrollLazy }) => {
  const { title, description } = useSiteMetadata();
  const [menuOpen, setMenuOpen] = useState(!workpost)

  const navStyle = {
    position: 'fixed',
    mixBlendMode: 'difference',
    backdropFilter: menuOpen && 'blur(10px)'
  }

  return (
    <div className="layout">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#fff" />
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <link href="//webfonts3.radimpesko.com/RP-W-885abb7b-ce87-49d3-8a21-24592c375f92" rel="stylesheet" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>

    <div className="nav" style={workpost && navStyle}>
      <div className="nav-bar" >
        <div className="logo">
          <Link to="/" className="title"><h1>anima ona</h1></Link>
          <div className="subtitle"><h2>studio for research, art and design</h2></div>
        </div>
        <div className="nav-links">
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          <div className="menu-button">
            <button style={{display: menuOpen && 'none'}} onClick={() => setMenuOpen(true)}>Menu</button>
            <button style={{display: !menuOpen && 'none'}} onClick={() => setMenuOpen(false)}>X</button>
          </div>
        </div>
      </div>

      {
        // workpost && <div className="nav-bar-fill-space"></div>
      }

      <Projectlist menuOpen={menuOpen} workpost={workpost} hiddenTag={hiddenTag} scrollLazy={scrollLazy} />
    </div>

      <div>{children}</div>

      <div className="footer">
        <div className="contact">
          <div className="title"><h1>anima ona</h1></div>
          <div className="adress"><h2>Strohberg 20, 70180 Stuttgart</h2></div>

          <div className="mail"><a href="mailto:animaona@gmail.com">animaona@gmail.com</a></div>
          <div className="insta-link"><a href='https://www.instagram.com/animaona/?hl=en' target="blank">Instagram</a></div>
        </div>
        <div className="nav-links-footer">
          <Link to="/imprint">Imprint</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>


    </div>
  )
}

export default Layout;
