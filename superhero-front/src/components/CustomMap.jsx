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
  const selectedMarkerCoords = props.circle ?? props.selected ?? center;
  const [distance, setDistance] = useState(null);
  const [origins, setOrigins] = useState(null);
  const [destination, setDestination] = useState(null);
  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const [circle, setCircle] = useState(props.circle);
  const [superheros, setSuperheros] = useState(props.superheros);
  const [declarationsData, setDeclarationsData] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(
    props.selectedMarker ?? null
  );

  const handleFetchData = async () => {
    const result = await fetchDeclarations();
  };

  const handleMapClick = (e) => {
    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(e.latLng, {
        lat: circle.lat,
        lng: circle.lng,
      });

    if (distance > 50000) {
      // Effectuez l'action souhaitée si la distance est supérieure au rayon du cercle
      setCircle(null);
      setSuperheros(null);
      setSelectedMarker(null);
      console.log("La distance est supérieure au rayon du cercle");
    }
  };

  useEffect(() => {
    handleFetchData();
    setSuperheros(props.superheros);
    console.log(declarations, " declarations");
  }, []);

  useEffect(() => {
    setCircle(props.circle);
  }, [props.circle]);

  useEffect(() => {
    console.log(props.superheros, "sale histoire");
    setSuperheros(props.superheros);
  }, [props.superheros]);

  useEffect(() => {
    setSelectedMarker(props.selectedMarker);
  }, [props.selectedMarker]);

  return (
    <div>
      <GoogleMap
        zoom={10}
        center={selectedMarkerCoords}
        mapContainerClassName="map-container"
        options={options}
        onClick={handleMapClick}
      >
        {declarations != null &&
          declarations.map((declaration) => {
            if (
              selectedMarker != null &&
              declaration.id === selectedMarker.id
            ) {
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
            } else if (selectedMarker === null) {
              return (
                <CustomMarker
                  position={{ lat: declaration.lat, lng: declaration.lng }}
                  type={declaration.incident.name ?? null}
                  key={declaration.id}
                  title={declaration.name}
                  details={declaration.details}
                />
              );
            }
          })}

        {/* {props.selected && selectedMarker === null ? (
          <MarkerF
            position={{ lat: props.selected.lat, lng: props.selected.lng }}
            zoomOnClick={true}
          ></MarkerF>
        ) : null} */}

        {circle ? (
          <CircleF
            center={{ lat: circle.lat, lng: circle.lng }}
            radius={50000}
            options={{ strokeColor: "#ff0000", fillColor: "#ff0000" }}
          />
        ) : null}

        {superheros != undefined &&
          superheros.map((hero) => {
            return (
              <CustomMarker
                position={{
                  lat: hero.superhero.latitude,
                  lng: hero.superhero.longitude,
                }}
                type="superhero"
                key={hero.superhero.id}
                title={hero.superhero.name}
                details={hero.distance}
              />
            );
          })}
      </GoogleMap>
    </div>
  );
}

export default memo(CustomMap);
