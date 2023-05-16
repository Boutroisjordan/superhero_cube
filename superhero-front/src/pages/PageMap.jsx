import { useState, useMemo, useEffect } from "react";
import flameLogo from "../assets/fire.svg";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  useJsApiLoader,
  DistanceMatrixService,
} from "@react-google-maps/api";
import "../App.css";
import CustomMap from "../components/CustomMap";
import Navbar from "../components/Navbar";

function PageMap() {
  const [count, setCount] = useState(0);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  if (!isLoaded) return <div>Loading ...</div>;
  return (
    <>
      <CustomMap />
    </>
  );
}

export default PageMap;
