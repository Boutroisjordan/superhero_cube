import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { MainContext } from "../context/MainContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(MainContext);

  // return (
  // <Route
  //   {...rest}
  //   render={(props) =>
  //     isAuthenticated() ? <Outlet /> : <Redirect to="/public" />
  //   }
  // />

  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
  // return isAuthenticated() ? <Outlet /> : <Navigate to="/home" />;
  // {
  //   isAuthenticated() ?
  //   <Outlet />
  //   :
  //   return ( <Redirect to="/public" /> )
  // }
};

export default PrivateRoute;
