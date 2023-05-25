import { useState } from "react";
import { fetchAPI, postAPI, putAPI, deleteAPI } from "../../utils/Axios";

export const IncidentTypeEntity = () => {
  const [incidentTypes, setIncidentTypes] = useState();
  return {
    incidentTypes: incidentTypes,
    fetchIncidentTypes: async () => {
      var result = await fetchAPI(`/incidents/`);
      setIncidentTypes(result.data);
      return result;
    },
  };
};

