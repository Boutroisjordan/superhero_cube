import { useState, useMemo, useEffect, memo, useContext } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  useJsApiLoader,
  DistanceMatrixService,
} from "@react-google-maps/api";
import flameLogo from "../assets/fire.svg";
import CustomMarker from "./CustomMarker";
import { MainContext } from "../context/MainContext";

function Places(props) {
  // const {isLoaded = useLoadScript({
  //   googleMapsApiKey: import.meta.env.VITE_API_KEY
  // })
  const { fetchDeclarations, declarations } = useContext(MainContext);
  const center = useMemo(() => ({ lat: 49.0241, lng: 1.1508 }), []);
  const [distance, setDistance] = useState(null);
  const [origins, setOrigins] = useState(null);
  const [destination, setDestination] = useState(null);
  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const [declarationsData, setDeclarationsData] = useState(null);

  const handleFetchData = async () => {
    const result = await fetchDeclarations();
  };

  useEffect(() => {
    handleFetchData();
    console.log(declarations, " declarations");
  }, []);

  return <div></div>;
}

export default Places;
