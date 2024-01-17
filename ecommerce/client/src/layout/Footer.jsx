import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="col1">
        <h1>this is aptron </h1>
      </div>
      <div className="col2">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <div className="media-icons">
      
  <i className="fa-brands fa-twitter" />
  <i className="fa-brands fa-square-instagram" />
  <i className="fa-brands fa-whatsapp" />
  <i className="fa-brands fa-facebook" />
</div>

      </div>
     
    </div>
  );
}
