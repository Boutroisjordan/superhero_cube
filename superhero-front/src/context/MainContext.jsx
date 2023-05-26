// MainContext.js
import React, { createContext, useState, useEffect, useMemo } from "react";
import { UserEntity } from "./Entities/UserEntity";
import { DeclarationEntity } from "./entities/DeclarationEntity";
import { SuperheroEntity } from "./entities/SuperheroEntity";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { IncidentTypeEntity } from "./entities/IncidentType";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const userEntity = UserEntity();
  const { fetchUserInfo } = userEntity;

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
  };

  const isAuthenticated = () => {
    const token = user;

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    }

    return false;
  };

  const handleFetchUserInfos = async (params) => {
    const resultUserInfos = await fetchUserInfo(params);
    if (resultUserInfos.status === 200) {
      setUsername(resultUserInfos.data.name);
    }
  };

  useEffect(() => {
    if (cookies["jwt"]) {
      //requête les infos user
      //set le token
      setUser(cookies["jwt"]);
      let params = {
        file: false,
        token: cookies["jwt"],
      };

      handleFetchUserInfos(params);

      //fetch user infos
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
        ...providerUser,
        ...providerUsername,
        ...DeclarationEntity(),
        ...IncidentTypeEntity(),
        ...SuperheroEntity(),
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
