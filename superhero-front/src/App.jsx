import { useState, useMemo, useEffect, useContext } from "react";

import "./App.css";
import CustomMap from "./components/CustomMap";
import Navbar from "./components/Navbar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PageMap from "./pages/PageMap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RedirectRouter from "./components/RedirectRouter";
import { MainContextProvider } from "./context/MainContext";

function App() {

  return (
    <>
      <MainContextProvider>
        <RedirectRouter />
      </MainContextProvider>
    </>
  );
}

export default App;
