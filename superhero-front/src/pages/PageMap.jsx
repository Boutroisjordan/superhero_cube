import { useState, useMemo, useEffect, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";
import "../App.css";
import CustomMap from "../components/CustomMap";
import { MainContext } from "../context/MainContext";
import FormDeclaration from "../components/FormDeclaration";
import Modal from "../components/Modal";

const libraries = ["places"];
const options = {
  googleMapsApiKey: import.meta.env.VITE_API_KEY,
  libraries,
};

function PageMap({ isLoaded }) {
  const { isAuthenticated, fetchNearestSuperheros } = useContext(MainContext);
  const [openDecla, setOpenDecla] = useState(false);
  const [addDecla, setAddDecla] = useState(null);
  const [addSearchCicle, setAddSearchCircle] = useState(null);
  const [nearestSuperheros, setNearestSuperheros] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleSetDecla = (decla) => {
    setAddDecla(decla);
    // console.log("Tu recois les cords: ", decla);
  };
  const handleSelectedMarker = (item) => {
    setSelectedMarker(item);
  };

  const handleSearchHero = async (item) => {
    setAddSearchCircle(item);
    if (item.id) {
      const result = await fetchNearestSuperheros(item.id);
      // console.log("le result superhero: ", result);
      setNearestSuperheros(result.data);
      setSelectedMarker(item);
      // setNearestSuperheros((nearestSuperheros) => [...nearestSuperheros, result]);
    } else {
      setNearestSuperheros([]);
    }
    // console.log("Tu recois search: ", item);
  };

  if (!isLoaded) return <div>Loading ...</div>;
  return (
    <>
      <CustomMap
        selected={addDecla}
        circle={addSearchCicle}
        superheros={nearestSuperheros}
        selectedMarker={selectedMarker}
      />
      {isAuthenticated() ? <FormDeclaration cbDecla={handleSetDecla} /> : null}
      <Modal search={handleSearchHero} />
    </>
  );
}

export default PageMap;
