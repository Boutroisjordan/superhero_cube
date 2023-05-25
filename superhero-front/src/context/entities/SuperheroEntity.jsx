import { useState } from "react";
import { fetchAPI, postAPI, putAPI, deleteAPI } from "../../utils/Axios";

export const SuperheroEntity = () => {
  const [superheros, setSuperheros] = useState();
  return {
    superheros: superheros,
    fetchSuperheros: async (email) => {
      var result = await fetchAPI(`/superheros/`);
      setSuperheros(result.data);
      return result;
    },
    fetchNearestSuperheros: async (id) => {
      var result = await fetchAPI(`/superheros/nearest/${id}`);
      setSuperheros(result.data);
      return result;
    },

    postSuperhero: async (data, params) => {
      var result = await postAPI(`/superheros`, data, params);
      console.log("le post dans entité: ", data, params);
      return result;
    },
  };
};


