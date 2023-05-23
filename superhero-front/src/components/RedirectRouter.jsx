import { useState, useMemo, useEffect } from "react";

import "../App.css";

import Navbar from "../components/Navbar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PageMap from "../pages/PageMap";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Declaration from "../pages/Declaration";
import PrivateRoute from "../utils/PrivateRoute";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];
const options = {
  googleMapsApiKey: import.meta.env.VITE_API_KEY,
  libraries,
};

function RedirectRouter() {
  const { isLoaded } = useLoadScript(options);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<PageMap isLoaded={isLoaded} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/declaration" element={<Declaration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RedirectRouter;
