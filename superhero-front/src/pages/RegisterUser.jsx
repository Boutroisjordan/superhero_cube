import { useState, useMemo, useEffect, useContext } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";

import "../App.css";
import { MainContext } from "../context/MainContext";
import * as StyledComponents from "../styles/styles.js";
import { PlacesAutocomplete } from "../components/PlacesAutocomplete";
import { useNavigate } from "react-router-dom";

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    height: 100%;
    font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
  }
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  height: calc(100% - 80px);
  width: 100%;
  gap: 0.5rem;
`;

const WrapperFlex = styled.section`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  flex: 1;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  // margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  max-width: 100%;
  width: 100%
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;
const Button2 = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
  flex: 1;
`;

const Title = styled.h2`
  font-weight: normal;
  color: #2a2a29;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

function RegisterUsers() {
  const navigate = useNavigate();
  const logoMap = {
    fire: import.meta.env.VITE_URL_API + "fire.svg",
    gas: import.meta.env.VITE_URL_API + "gas.svg",
    car: import.meta.env.VITE_URL_API + "car.svg",
    plane: import.meta.env.VITE_URL_API + "plane.svg",
    prison: import.meta.env.VITE_URL_API + "prison.svg",
    snake: import.meta.env.VITE_URL_API + "snake.svg",
    landslide: import.meta.env.VITE_URL_API + "landslide.svg",
    manif: import.meta.env.VITE_URL_API + "manif.svg",
    flood: import.meta.env.VITE_URL_API + "flood.svg",
    braquage: import.meta.env.VITE_URL_API + "braquage.svg",
  };

  const {
    postSuperhero,
    fetchIncidentTypes,
    fetchDeclarations,
    postDeclaration,
    postSignIn,
    user,
  } = useContext(MainContext);
  const [step, setStep] = useState(1);

  const [coords, setCoords] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);
  const [passwordRepeat, setPasswordRepeat] = useState(null);

  // const [hasErrorForm, setHasErrorForm] = useState(null);
  const [hasErrorForm, setHasErrorForm] = useState(null);
  const [placesValue, setplacesValue] = useState(null);

  const nextStep = (e) => {
    e.preventDefault();
    // setStep(step + 1);

    if (step === 1 && handleMapLoad(placesValue) === false) {
      setHasErrorForm("Le nom doit correspondre à une ville");
    } else if (step === 2 && password != passwordRepeat) {
      setHasErrorForm("Les mots de passe ne sont pas identiques");
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleMapLoad = (city) => {
    // Vérifier le nom de la ville lorsque la carte est chargée
    const cityName = city; // Remplacez par le nom de la ville que vous souhaitez vérifier

    const geocoder = new window.google.maps.Geocoder();
    return geocoder.geocode({ address: cityName }, (results, status) => {
      if (status === "OK") {
        if (results[0].formatted_address.includes(cityName)) {
          console.log("Le nom correspond à une ville valide");
          setName(cityName);
          return true;
        } else {
          console.log("Le nom ne correspond pas à une ville valide");
          return false;
        }
      } else {
        console.log("Erreur de géocodage :", status);
        return false;
      }
    });
  };

  const handleCheckPhone = (phone) => {
    const regex = /^\d{10}$/;

    if (regex.test(phone)) {
      console.log("Numéro de téléphone valide !");
      return true;
    } else {
      console.log("Numéro de téléphone invalide !");
      return false;
    }

    //check if it's a valid city
    handleMapLoad();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      name: name,
      latitude: coords.lat,
      longitude: coords.lng,
      email: email,
      password: password,
    };
    let params = {
      file: false,
      token: user ?? "",
    };

    try {
      const response = await postSignIn(data, params);
      if (response.status === 200 || response.status === 201) {
        navigate("/");
      } else {
        // throw new Error("Erreur HTTP ");
        setHasErrorForm("Error sign in");
        console.log("response: ", response);
      }
    } catch (e) {
      console.log("erreur signIn ", e);
    }
  };

  const handleDisabledOption = (item) => {
    const objetExiste = selectedIncident.some(function (objet) {
      return objet.id === item.id;
    });

    if (!objetExiste && selectedIncident.length >= 3) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    setHasErrorForm(null);
  }, [name, email, password]);

  useEffect(() => {
    console.log("le name il chnage: ", name);
  }, [name]);

  const handleGetPlacesName = (placesName) => {
    setplacesValue(placesName);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Wrapper>
            {/* {placesValue ?? ""} */}
            <PlacesAutocomplete
              getName={handleGetPlacesName}
              setSelected={setCoords}
              placeholder="Nom de la ville *"
            />

            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // setHasErrorForm("");
              }}
              placeholder="Email *"
            />
            <Button onClick={nextStep}>Next</Button>
          </Wrapper>
        );
        break;
      case 2:
        return (
          <Wrapper>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setHasErrorForm("");
              }}
              placeholder="Mot de passe *"
            />

            <Input
              type="password"
              name="passwordrepeat"
              value={passwordRepeat ?? ""}
              onChange={(e) => {
                setPasswordRepeat(e.target.value);
                // setHasErrorForm("");
              }}
              placeholder="Confirmer mot de passe *"
            />

            <StyledComponents.WrapperFlex>
              <StyledComponents.Button2 onClick={prevStep}>
                Back
              </StyledComponents.Button2>
              <StyledComponents.Button2 onClick={nextStep}>
                Next
              </StyledComponents.Button2>
            </StyledComponents.WrapperFlex>
          </Wrapper>
        );
        break;
      case 3:
        return (
          <Wrapper>
            <div style={{ textAlign: "le" }}>
              <h2>Confirmez-vous les informations ?</h2>
              <p>Nom Mairie/Ville: {name}</p>
              <p>Latitude: {coords.lat}</p>
              <p>Longitude: {coords.lng}</p>
              <p>Email: {email}</p>
              <p>Mot de passe: {password}</p>
            </div>

            <StyledComponents.WrapperFlex>
              <StyledComponents.Button2 onClick={prevStep}>
                Back
              </StyledComponents.Button2>
              <StyledComponents.Button2
                style={{ flex: "1" }}
                onClick={handleSubmit}
              >
                Enregistrer
              </StyledComponents.Button2>
            </StyledComponents.WrapperFlex>
          </Wrapper>
        );
        break;
      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper style={{ background: "#FDF9F3" }}>
        <Form>{renderStep()}</Form>
      </Wrapper>

      {hasErrorForm && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "#ffffff",
            padding: "12px 24px",
            textAlign: "left",
            borderRadius: "12px",
            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "16px", color: "red" }}>Error</h2>
          <p>{hasErrorForm}</p>
        </div>
      )}
    </>
  );
}

export default RegisterUsers;