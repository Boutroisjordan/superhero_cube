import { useState, useMemo, useEffect } from "react";

import "../App.css";

import Navbar from "../components/Navbar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PageMap from "../pages/PageMap";
import Login from "../pages/Login";
import Register from "../pages/Register";

function RedirectRouter() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<PageMap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RedirectRouter;
