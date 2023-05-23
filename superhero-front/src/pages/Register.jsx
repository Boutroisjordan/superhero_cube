import { useState, useMemo, useEffect, useContext } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";

import "../App.css";
import { MainContext } from "../context/MainContext";
import * as StyledComponents from "../styles/styles.js";
import { PlacesAutocomplete } from "../components/PlacesAutocomplete";

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
    background: #FDF9F3;
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
  height: 100%;
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

function Register() {
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
    user,
  } = useContext(MainContext);
  const [step, setStep] = useState(1);

  const [coords, setCoords] = useState(false);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [incidents, setIncidents] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState([]);

  const [hasErrorForm, setHasErrorForm] = useState(null);
  //new start
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectIncident = (item) => {
    const objetExiste = selectedIncident.some(function (objet) {
      return objet.id === item.id;
    });

    if (objetExiste) {
      setSelectedIncident((prevState) =>
        prevState.filter((incident) => incident.id !== item.id)
      );
    }

    if (!objetExiste && selectedIncident.length < 3) {
      let copy = selectedIncident;
      setSelectedIncident((incidents) => [...incidents, item]);
    }
    console.log("lalalalalalaaaa: ", selectedIncident);
  };

  const handleIsInSelected = (item) => {
    const objetExiste = selectedIncident.some(function (objet) {
      return objet.id === item.id;
    });

    return objetExiste;
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 1 && handleCheckPhone(phone)) {
      setStep(step + 1);
      console.log("cst okkkk pour moi,phone ");
    }

    if (step === 2) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let incidentNames = [];
    selectedIncident.forEach((incident) => {
      incidentNames.push({ name: incident.name });
    }, []);

    let data = {
      phone: phone,
      name: name,
      latitude: coords.lat,
      longitude: coords.lng,
      incidents: incidentNames,
    };
    let params = {
      file: false,
      token: user ?? "",
    };

    try {
      const response = await postSuperhero(data, params);
      if (response.status === 200 || response.status === 201) {
        navigate("/");
      } else {
        // throw new Error("Erreur HTTP ");
        console.log("response: ", response);
      }
    } catch (e) {
      console.log("l'erruer ma gueule: ", e);
      // setHasError("Bad Creds");
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
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

  const handlefetchIncidents = async () => {
    const result = await fetchIncidentTypes();
    setIncidents(result.data);
  };

  useEffect(() => {
    handlefetchIncidents();
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Wrapper>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setHasErrorForm("");
              }}
              placeholder="Nom de superhéros *"
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
              {/* {hasErrorForm ?? null} */}
            </p>
            <Input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                // setHasErrorForm("");
              }}
              placeholder="Téléphone *"
            />
            <Button onClick={nextStep}>Next</Button>
          </Wrapper>
        );
        break;
      case 2:
        return (
          <StyledComponents.WrapperForm>
            Choix multiple:
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {incidents
                ? incidents.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={`option-type ${
                          handleIsInSelected(item) === true ? "selected" : ""
                        } ${
                          handleDisabledOption(item) === true ? "disabled" : ""
                        }‘`}
                        onClick={() => handleSelectIncident(item)}
                      >
                        <img width="100px" src={logoMap[item.name]} />
                      </div>
                    );
                  })
                : null}
              list selected:
              {selectedIncident.length > 0
                ? selectedIncident.map((item) => {
                    return (
                      <div>
                        <p>{item.name}</p>
                        allo
                      </div>
                    );
                  })
                : null}
            </div>
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
        break;
      case 3:
        return (
          <StyledComponents.WrapperForm>
            <PlacesAutocomplete setSelected={setCoords} />
            <StyledComponents.WrapperFlex>
              <StyledComponents.Button2 onClick={prevStep}>
                Back
              </StyledComponents.Button2>
              <StyledComponents.Button2 onClick={(e) => handleSubmit(e)}>
                Next
              </StyledComponents.Button2>
            </StyledComponents.WrapperFlex>
          </StyledComponents.WrapperForm>
        );

        break;

      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Form>{renderStep()}</Form>
      </Wrapper>
    </>
  );
}

export default Register;
