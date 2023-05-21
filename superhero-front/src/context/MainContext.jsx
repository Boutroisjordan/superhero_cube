// MainContext.js
import React, { createContext, useState, useEffect, useMemo } from "react";
import { UserEntity } from "./Entities/UserEntity";
import { DeclarationEntity } from "./entities/DeclarationEntity";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { IncidentTypeEntity } from "./entities/IncidentType";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  // const {fetchDeclarations} = {...DeclarationEntity()};
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  // const [declarations, setDeclarations] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  const providerUsername = useMemo(
    () => ({ username, setUsername }),
    [username, setUsername]
  );

  const setToken = (token) => {
    setCookie("jwt", token);
  };

  const logoutUser = () => {
    removeCookie("jwt");
    setUser(null);
    providerUser.setUser(null);

    console.log("user: ", user, " cookie: ", cookies["jwt"]);
  };

  const isAuthenticated = () => {
    const token = user;
    console.log("Passe dans auth: ", token);
    console.log("Passe dans auth user: ", user);
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log("resultat authenticated: ", decodedToken.exp > currentTime);
      return decodedToken.exp > currentTime;
    }
    console.log("resultat authenticated: ", false);

    return false;
  };

  useEffect(() => {
    if (cookies["jwt"]) {
      //requête les infos user
      //set le token
      setUser(cookies["jwt"]);
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
        ...providerUser,
        ...providerUsername,
        ...DeclarationEntity(),
        ...IncidentTypeEntity(),
        ...UserEntity(),
        setToken,
        isAuthenticated,
        logoutUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
