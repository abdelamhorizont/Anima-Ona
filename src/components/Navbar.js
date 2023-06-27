import React from "react";
import { Link } from "gatsby";

export default function Navbar() {
  return (
    <div>
      <div className="Logo">
        <Link to="/" className="title">anima ona</Link>
        <div className="subtitle">studio for research, art and design</div>
      </div>
      <div className="nav-links">
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  )
}
