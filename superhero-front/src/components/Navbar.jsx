import React from "react";
import Logo from "../assets/logoaled.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <img
        className="logo"
        src={Logo}
        alt="logo de la web app, représentant une main"
      />
      {/* <div className="search-bar">searchbar</div> */}
      <div className="search-bar">
        {/* <Link to="/">Home</Link>
        <Link to="/login">Login</Link> */}
        <a href="/login">Login</a>
        <a href="/">Home</a>
      </div>
      <div>user</div>
    </div>
  );
}
