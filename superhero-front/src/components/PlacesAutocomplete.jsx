import { useState, useMemo, useEffect, useContext } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import * as StyledComponents from "../styles/styles.js";

export const PlacesAutocomplete = ({ setSelected }) => {
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
    setOpen(false);
  };

  useEffect(() => {
    if (data.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [data]);

  const handleOpen = () => {};

  return (
    <>
      <StyledComponents.Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // onFocus={() => setOpen(true)}
        // onInput={() => {
        //   console.log("any suggestion ?: ", data);
        //   console.log("any suggestion ?: ", status);
        //   if (data.length > 0) {
        //     setOpen(true);
        //   } else {
        //     setOpen(false);
        //   }
        // }}
        disabled={!ready}

        placeholder="search address"
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
              {console.log("ouvert ou pas ?: ", open)}
              {description}
            </StyledComponents.Option>
          ))}
      </StyledComponents.WrapperOptions>
      {/* </div> */}
      {/* <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="search address"
      /> */}
    </>
  );
};
