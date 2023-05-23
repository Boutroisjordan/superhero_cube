import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  useJsApiLoader,
  DistanceMatrixService,
  InfoWindowF,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";


const logoMap = {
  fire: import.meta.env.VITE_URL_API + "fire_marker.svg",
  gas: import.meta.env.VITE_URL_API + "gas_marker.svg",
  car: import.meta.env.VITE_URL_API + "car_marker.svg",
  plane: import.meta.env.VITE_URL_API + "plane_marker.svg",
  prison: import.meta.env.VITE_URL_API + "prison_marker.svg",
  snake: import.meta.env.VITE_URL_API + "snake_marker.svg",
  landslide: import.meta.env.VITE_URL_API + "landslide_marker.svg",
  manif: import.meta.env.VITE_URL_API + "manif_marker.svg",
  flood: import.meta.env.VITE_URL_API + "flood_marker.svg",
  braquage: import.meta.env.VITE_URL_API + "braquage_marker.svg",
};

export default function CustomMarker(props) {
  // const [positions, setPositions] = useState({ lat: 0, lng: 0 });
  const [logo, setLogo] = useState(logoMap[props.type]);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [details, setDetails] = useState(props.details);
  const [title, setTitle] = useState(props.title);

  const handleMarkerClick = (e) => {
    console.log("coucou lolo", e);
    handleOpenWindowInfo();
  };

  const handleOpenWindowInfo = () => {
    setInfoWindowOpen(true);
  };

  useEffect(() => {
    setLogo(logoMap[props.type] || null);
  }, [props.type]);

  useEffect(() => {
    // setPositions(props.position);
    console.log("les props: ", props.position);
  }, []);

  useEffect(() => {
    // setPositions(props.position);
    console.log("logo: ", props.type);
    setLogo(logoMap[props.type] || null);
  }, [logo]);

  return (
    <>
      <MarkerF
        position={props.position}
        zoomOnClick={true}
        onClick={handleMarkerClick}
        icon={logo}
        title={props.type}
      >
        {infoWindowOpen ? (
          <InfoWindowF
            style={{ color: "#000000" }}
            onCloseClick={() => setInfoWindowOpen(false)}
          >
            <>
              <h1>{title}</h1>
              <p>{details}</p>
            </>
            {/* <h1>lololo</h1> */}
          </InfoWindowF>
        ) : null}
      </MarkerF>
    </>
  );
}

// Incendie /OK

// Accident routier /OK

// Accident fluvial /OK

// Accident aérien /OK

// Eboulement /ok

// Invasion de serpent / ok

// Fuite de gaz /ok

// Manifestation / a transformer en svg

// Braquage / a  transformer en svg

// Evasion d’un prisonnier  / transformer