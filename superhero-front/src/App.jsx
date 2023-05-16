import { useState, useMemo, useEffect } from "react";

import "./App.css";
import CustomMap from "./components/CustomMap";
import Navbar from "./components/Navbar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PageMap from "./pages/PageMap";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<PageMap />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
