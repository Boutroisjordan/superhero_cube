import React, { useContext } from "react";
import { MainContext } from "./MainContext";

const ProtectedPage = () => {
  const { user, logout } = useContext(MainContext);

  return (
    <div>
      <h1>Page protégée</h1>
      <p>Bienvenue, {user.username}</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
};

export default ProtectedPage;
