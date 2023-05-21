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

const data = [
  {
    id: 1,
    title: "Incendie immeuble",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 49.0241,
      lng: 1.1508,
    },
    type: "fire",
  },
  {
    id: 2,
    title: "accient de voiture",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 50.0241,
      lng: 1.1508,
    },
    type: "car",
  },
  {
    id: 3,
    title: "crash de l'avion 757 de ryan air",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 48.0241,
      lng: 2,
    },
    type: "plane",
  },
  {
    id: 5,
    title: "braquage de fourgon blindé",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 47.0241,
      lng: 1.1508,
    },
    type: "braquage",
  },
  {
    id: 6,
    title: "éboulement de la coline",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 46.0241,
      lng: 1.308,
    },
    type: "landslide",
  },
  {
    id: 7,
    title: "Invasion de serpents",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 46.0251,
      lng: 1.1508,
    },
    type: "snake",
  },
  {
    id: 8,
    title: "Innondations",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 46.9251,
      lng: 3.178,
    },
    type: "flood",
  },
  {
    id: 9,
    title: "Fuide de gaz appartement",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 44.0761,
      lng: 1.178,
    },
    type: "gas",
  },
  {
    id: 10,
    title: "Manifestations avec des casseurs",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 49.0761,
      lng: -1.878,
    },
    type: "manif",
  },
  {
    id: 11,
    title: "Priosnner évadé à fleury",
    details: "Un incendie rue vaugirard sur l'immeuble jaune",
    position: {
      lat: 44.0761,
      lng: 1.97998,
    },
    type: "prison",
  },
];

function CustomMap(props) {
  const { fetchDeclarations, declarations } = useContext(MainContext);
  const center = useMemo(() => ({ lat: 49.0241, lng: 1.1508 }), []);
  const selectedMarker = props.selected ?? center;
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
  return (
    <div>
      <GoogleMap
        zoom={10}
        center={selectedMarker}
        mapContainerClassName="map-container"
        options={options}
      >
        {declarations != null
          ? declarations.map((declaration) => {
              return (
                // <MarkerF position={declaration.position} icon={flameLogo} />
                <CustomMarker
                  position={{ lat: declaration.lat, lng: declaration.lng }}
                  type={declaration.incident.name ?? null}
                  key={declaration.id}
                  title={declaration.name}
                  details={declaration.details}
                />
              );
            })
          : null}

        {props.selected ? (
          <MarkerF
            position={{ lat: props.selected.lat, lng: props.selected.lng }}
            zoomOnClick={true}
          ></MarkerF>
        ) : null}
      </GoogleMap>
      {/* <DistanceMatrixService
        options={{
          destinations: [{ lat: 49.0241, lng: 1.1508 }],
          origins: [{ lng: 2, lat: 50 }],
          travelMode: "DRIVING",
        }}
        callback={(response) => {
          setDestination(response.destinationAddresses);
          setOrigins(response.originAddresses);
          setDistance(response.rows[0].elements[0].distance.text);
          console.log("la réponse: ", response);
        }}
      /> */}
      {/* <p>import.meta.env.VITE_API_KEY</p> */}
      {/* <DistanceComponent
        origin={origins}
        dest={destination}
        distance={distance}
      /> */}
    </div>
  );

  function DistanceComponent(props) {
    return (
      <div className="modal">
        <p>Origin: {props.origin}</p>
        <p>Destination: {props.dest} </p>
        <p>Distance: {props.distance} </p>
      </div>
    );
  }
}

export default memo(CustomMap);
