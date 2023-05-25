import { useState } from "react";
import { fetchAPI, postAPI, putAPI, deleteAPI } from "../../utils/Axios";

export const DeclarationEntity = () => {
  const [declarations, setDeclarations] = useState();
  return {
    declarations: declarations,
    fetchDeclarations: async (email) => {
      var result = await fetchAPI(`/declarations/`);
      setDeclarations(result.data);
      return result;
    },
  };
};

