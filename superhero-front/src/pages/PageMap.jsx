import { useState, useMemo, useEffect, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";
import "../App.css";
import CustomMap from "../components/CustomMap";
import { MainContext } from "../context/MainContext";
import FormDeclaration from "../components/FormDeclaration";


const libraries = ["places"];
const options = {
  googleMapsApiKey: import.meta.env.VITE_API_KEY,
  libraries,
};

function PageMap({ isLoaded }) {
  const { isAuthenticated } = useContext(MainContext);
  const [openDecla, setOpenDecla] = useState(false);
  const [addDecla, setAddDecla] = useState(null);

  const handleSetDecla = (decla) => {
    setAddDecla(decla);
    console.log("Tu recois les cords: ", decla);
  };

  if (!isLoaded) return <div>Loading ...</div>;
  return (
    <>
      <CustomMap selected={addDecla} />
      {isAuthenticated() ? <FormDeclaration cbDecla={handleSetDecla} /> : null}
    </>
  );
}

export default PageMap;
