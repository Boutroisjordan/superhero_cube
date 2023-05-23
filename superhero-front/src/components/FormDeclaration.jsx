import * as StyledComponents from "../styles/styles.js";
import { PlacesAutocomplete } from "../components/PlacesAutocomplete";
import { useState, useMemo, useEffect, useContext } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { MainContext } from "../context/MainContext.jsx";

export default function FormDeclaration(props) {
  const { fetchIncidentTypes, fetchDeclarations, postDeclaration, user } =
    useContext(MainContext);
  const [step, setStep] = useState(1);
  const [openDecla, setOpenDecla] = useState(false);
  const [coords, setCoords] = useState(false);

  const [name, setName] = useState(null);
  const [details, setDetails] = useState(null);
  const [incidents, setIncidents] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const [hasErrorForm, setHasErrorForm] = useState(null);

  const handleOpenDeclaration = (bool) => {
    // e.preventDefault();
    if (!bool) {
      // props.cbDecla(null);
      setStep(1);
    }
    setOpenDecla(bool);
    console.log("bitass : ", bool);
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 1 && handleCheckStrings(name)) {
      setStep(step + 1);
    }

    if (step === 2 && handleCheckIncident()) {
      setStep(step + 1);
    }

    if (step === 3) {
      handleMoveToPosition();
      setStep(step + 1);
    }

    // if (step + 1 === 4) {
    //   // handleMoveToPosition();
    //   setStep(step + 1);
    // }
    console.log("pas bon");
    // setStep(step + 1);

    setHasErrorForm("Veuillez renseigner les champs obligatoire");
  };

  const prevStep = (e) => {
    e.preventDefault();
    if (step === 4) {
      props.cbDecla(null);
    }
    setStep(step - 1);
  };

  const handleSetDecla = (decla) => {
    props.cbDecla(decla);
  };

  const handleCheckStrings = (string) => {
    if (string === null || string === undefined) {
      return false;
    } else if (string.length === 0) {
      return false;
    }

    return true;
  };
  const handleCheckIncident = (string) => {
    if (
      isNaN(selectedIncident) ||
      selectedIncident === null ||
      selectedIncident === undefined
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      details: details ?? "",
      lat: coords.lat,
      lng: coords.lng,
      superheros: [],
      incident: {
        id: selectedIncident,
      },
    };

    console.log("dadadata: ", data);
    let params = {
      file: false,
      token: user,
    };

    try {
      const result = await postDeclaration(data, user);
      if (result.status === 200 || result.status === 201) {
        console.log("Le resultas du post:");
        fetchDeclarations();
        handleOpenDeclaration(false);
        setStep(1);
        //Afficher les superhéros compatible et leur kilométrage
        // setUser(result.data.jwt);
        // setToken(result.data.jwt);
        // setUsername(result.data.username);
      } else {
        throw new Error("Erreur HTTP ");
      }
    } catch (e) {
      console.log("l'erreur ma gueule: ", e);
      // setHasError("Bad Creds");
    }
  };

  const handleMoveToPosition = () => {
    if (coords) {
      handleSetDecla(coords);
    }
  };

  const handleSelectIncidentType = (e) => {
    setSelectedIncident(e.target.value);
  };

  const handlefetchIncidents = async () => {
    const result = await fetchIncidentTypes();
    // console.log(result, " lopsa lopsa !!!!!!!!!!!!!!");
    setIncidents(result.data);
  };

  useEffect(() => {
    handlefetchIncidents();
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StyledComponents.WrapperForm>
            <div>
              <StyledComponents.Input
                type="text"
                name="Nom descriptif"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setHasErrorForm("");
                }}
                placeholder="Titre descriptif *"
              />
              <p
                style={{
                  color: "red",
                  margin: 0,
                  fontSize: "0.65rem",
                  textAlign: "left",
                }}
              >
                {" "}
                {hasErrorForm ?? null}
              </p>
            </div>
            <StyledComponents.TextArea
              type="text-area"
              name="password"
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
                setHasErrorForm("");
              }}
              placeholder="Details (optionnal)"
              rows="4"
              cols="23"
            ></StyledComponents.TextArea>
            <StyledComponents.Button onClick={nextStep}>
              Next
            </StyledComponents.Button>
          </StyledComponents.WrapperForm>
        );
      case 2:
        return (
          <StyledComponents.WrapperForm>
            <StyledComponents.Select
              onChange={handleSelectIncidentType}
              onSelect={handleSelectIncidentType}
            >
              <option value="">Selectionner un type d'incident</option>;
              {incidents.map((item) => {
                return (
                  <option
                    key={item.id}
                    value={item.id}
                    // onClick={(item) => handleSelectIncident(item)}
                    // onSelect={(item) => handleSelectIncident(item)}
                  >
                    {item.name}
                  </option>
                );
              })}
            </StyledComponents.Select>
            <StyledComponents.WrapperFlex>
              <StyledComponents.Button2 onClick={prevStep}>
                Back
              </StyledComponents.Button2>
              <StyledComponents.Button2 onClick={nextStep}>
                Next
              </StyledComponents.Button2>
            </StyledComponents.WrapperFlex>
          </StyledComponents.WrapperForm>
        );
      case 3:
        return (
          <StyledComponents.WrapperForm>
            <PlacesAutocomplete setSelected={setCoords} />
            <StyledComponents.WrapperFlex>
              <StyledComponents.Button2 onClick={prevStep}>
                Back
              </StyledComponents.Button2>
              <StyledComponents.Button2 onClick={nextStep}>
                Next
              </StyledComponents.Button2>
            </StyledComponents.WrapperFlex>
          </StyledComponents.WrapperForm>
        );
      case 4:
        return (
          <StyledComponents.WrapperForm2>
            Est ce le bon endroit ?
            <Player
              autoplay
              loop
              src="https://assets7.lottiefiles.com/packages/lf20_ld8q03sg.json"
              style={{ height: "100px", width: "100px" }}
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>

            <StyledComponents.WrapperFlex>
              <StyledComponents.Button2 onClick={prevStep}>
                Non
              </StyledComponents.Button2>
              <StyledComponents.Button2 onClick={handleSubmit}>
                Oui !
              </StyledComponents.Button2>
            </StyledComponents.WrapperFlex>
          </StyledComponents.WrapperForm2>
        );
      default:
        return null;
    }
  };


  return (
    <StyledComponents.ResizeDiv>
      {openDecla == false ? (
        <StyledComponents.ButtonAjout
          onClick={() => handleOpenDeclaration(true)}
        >
          Ajouter une déclaration
        </StyledComponents.ButtonAjout>
      ) : (
        <StyledComponents.Wrapper>
          <StyledComponents.CloseButton
            onClick={() => handleOpenDeclaration(false)}
          >
            X
          </StyledComponents.CloseButton>
          <StyledComponents.Form>{renderStep()}</StyledComponents.Form>
        </StyledComponents.Wrapper>
      )}
    </StyledComponents.ResizeDiv>
  );
}
