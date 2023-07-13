import * as React from "react";
import { Helmet } from "react-helmet";

import useSiteMetadata from "../SiteMetadata";
import { withPrefix, Link } from "gatsby";

import './layout.scss'

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
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
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>

      <div className="nav-bar">
        <div className="Logo">
          <Link to="/" className="title">anima ona</Link>
          <div className="subtitle">studio for research, art and design</div>
        </div>
        <div className="nav-links">
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      <div>{children}</div>

    <div className="nav-bar">
      <div className="contact">
        <div className="title">anima ona</div>
        <div className="adress">Strohberg 20, 70180 Stuttgart</div>
        <div className="mail"><a href="mailto:animaona@gmail.com">animaona@gmail.com</a></div>
        <div className="insta-link">Instagram</div>
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
