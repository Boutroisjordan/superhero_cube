import React, { useContext } from "react";
import Logo from "../assets/logoaled.png";
import { Link } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { MainContext } from "../context/MainContext";
import { useNavigate } from "react-router-dom";

// import SuperHeroLogo from "../assets/icon-sphero.png";
import LightLogo from "../assets/elcair.png";
import SuperHeroLogo from "../assets/superhero-only2.png";
import MairieLogo from "../assets/mairie.png";
import Rain from "../assets/rain.webp";

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
  const { username, isAuthenticated, logoutUser } = useContext(MainContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    console.log("Logout man");
    logoutUser();
    // navigate("/");
  };
  return (
    <div className="navbar">
      <Link to={`/`}>
        <img
          className="logo"
          src={Logo}
          alt="logo de la web app, représentant une main"
        />
      </Link>

      <div>
        <div
          style={{
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            color: "#fdf9f3",
            // background: "yellow",
            borderRadius: "50px",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0, 0.1)",
          }}
        >
          <div
            className="icon-navbar-register superhero"
            style={{ width: "50%" }}
          >
            {/* <img className="rain" src={Rain} /> */}
            <Link
              to="register"
              className="rain"
              style={{
                backgroundImage: `url(${Rain})`,
              }}
            ></Link>
            <img className="eclair" style={{ width: "50px" }} src={LightLogo} />
            <img
              className="superhero-img"
              style={{ width: "50px" }}
              src={SuperHeroLogo}
            />
          </div>
          <div className="icon-navbar-register town" style={{ width: "50%" }}>
            <div className="soleil-bg"></div>
            <img
              className="town-img"
              style={{ width: "50px" }}
              src={MairieLogo}
            />
          </div>
        </div>

        {isAuthenticated() ? null : <Link to={`register`}>Register</Link>}
      </div>
      <div>
        {isAuthenticated() ? (
          <>
            {username ?? ""}
            <button onClick={(e) => handleLogout(e)}>Logout</button>
          </>
        ) : (
          <Link to={`login`}>Login</Link>
        )}
      </div>
    </div>
  );
}
