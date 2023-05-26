import { useState, useMemo, useEffect, useContext } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import * as StyledComponents from "../styles/styles.js";

export const PlacesAutocomplete = ({ placeholder, setSelected, getName }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [open, setOpen] = useState(false);

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const result = await getGeocode({ address });
    const { lat, lng } = await getLatLng(result[0]);
    setSelected({ lat, lng });

    if (getName) {
      getName(result[0].address_components[0].long_name);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (data.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [data]);

  return (
    <>
      <StyledComponents.Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder={placeholder ?? "Adresse"}
      />
      {/* <div className="options-container"> */}
      <StyledComponents.WrapperOptions className={open ? "open" : ""}>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <StyledComponents.Option
              key={place_id}
              value={description}
              onClick={() => handleSelect(description)}
            >
              {description}
            </StyledComponents.Option>
          ))}
      </StyledComponents.WrapperOptions>
    </>
  );
};
