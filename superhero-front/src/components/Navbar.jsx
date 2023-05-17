import React from "react";
import Logo from "../assets/logoaled.png";
import { Link } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";

const WrapperFlex = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
  color: #fdf9f3;
  background: transparent;
`;

export default function Navbar() {
  return (
    <div className="navbar">
      <img
        className="logo"
        src={Logo}
        alt="logo de la web app, représentant une main"
      />
      {/* <div className="search-bar">searchbar</div> */}

      <WrapperFlex>
        {/* <Link to={"/login"}>Login</Link> */}
        <Link to={`/`}>Home</Link>
        <Link to={`login`}>Login</Link>
        <Link to={`register`}>Register</Link>
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/Register">Register</Link> */}
        {/* <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/">Home</a> */}
      </WrapperFlex>
      <div>user</div>
    </div>
  );
}
