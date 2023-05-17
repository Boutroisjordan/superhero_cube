// MainContext.js
import React, { createContext, useState, useEffect, useMemo } from "react";
import { UserEntity } from "./Entities/UserEntity";
export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [navBarIsVisible, setNavbarValue] = useState("1");

  useEffect(() => {}, []);

  return (
    <MainContext.Provider
      value={{
        ...providerUser,
        ...UserEntity(),
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
