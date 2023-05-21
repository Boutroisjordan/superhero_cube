import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  useJsApiLoader,
  DistanceMatrixService,
  InfoWindowF,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import flameLogo from "../assets/fire-2.svg";
// import braquageLogo from "../assets/braquage.svg";
import braquageLogo from "../assets/braquage-2.svg";
import carLogo from "../assets/car.svg";
import prisonLogo from "../assets/prison-2.svg";
import planeLogo from "../assets/plane-2.svg";
import snakeLogo from "../assets/snake-2.svg";
import landslideLogo from "../assets/lands.svg";
import manifLogo from "../assets/manif-2.svg";
import floodLogo from "../assets/floood.svg";
import gasLogo from "../assets/gaz.svg";

const logoMap = {
  fire: flameLogo,
  gas: gasLogo,
  car: carLogo,
  plane: planeLogo,
  prison: prisonLogo,
  snake: snakeLogo,
  landslide: landslideLogo,
  manif: manifLogo,
  flood: floodLogo,
  braquage: braquageLogo,
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