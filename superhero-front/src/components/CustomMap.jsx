import { useState, useMemo, useEffect, memo, useContext } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  useJsApiLoader,
  DistanceMatrixService,
  CircleF,
} from "@react-google-maps/api";
import flameLogo from "../assets/fire.svg";
import CustomMarker from "./CustomMarker";
import { MainContext } from "../context/MainContext";

function CustomMap(props) {
  const { fetchDeclarations, declarations } = useContext(MainContext);
  const center = useMemo(() => ({ lat: 49.0241, lng: 1.1508 }), []);
  const selectedMarker = props.circle ?? props.selected ?? center;
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

        {props.circle ? (
          <CircleF
            center={{ lat: props.circle.lat, lng: props.circle.lng }}
            radius={50000}
            options={{ strokeColor: "#ff0000", fillColor: "#ff0000" }}
          />
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default memo(CustomMap);
