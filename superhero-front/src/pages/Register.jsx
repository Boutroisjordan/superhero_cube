import { useState, useMemo, useEffect, useContext } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";

import "../App.css";
import { MainContext } from "../context/MainContext";

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
  align-items: center;
  height: 100%;
  width: 100%;
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
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
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
  const { user } = useContext(MainContext);
  //new start
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Effectuer les actions nécessaires avec les données du formulaire
  //   console.log(formData);
  // };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => handleChangeEmail(e)}
              placeholder="Email"
            />
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => handleChangePassword(e)}
            />
            <Button onClick={nextStep}>Next</Button>
          </>
        );
      case 2:
        return (
          <>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => handleChangeEmail(e)}
              placeholder="Email"
            />
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => handleChangePassword(e)}
            />
            <WrapperFlex>
              <Button2 onClick={prevStep}>Back</Button2>
              <Button2 onClick={nextStep}>Next</Button2>
            </WrapperFlex>
          </>
          // <div>
          //   <input
          //     type="password"
          //     name="password"
          //     placeholder="Mot de passe"
          //     value={formData.password}
          //     onChange={handleChange}
          //   />
          //   <button onClick={prevStep}>Précédent</button>
          //   <button onClick={nextStep}>Suivant</button>
          // </div>
        );
      case 3:
        return (
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <button onClick={prevStep}>Précédent</button>
            <button type="submit">Se connecter</button>
          </div>
        );
      default:
        return null;
    }
  };
  //new end

  const [dados, setDados] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dados);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  // return (
  //   <>
  //     <GlobalStyle />
  //     <Wrapper>
  //       <Form onSubmit={handleSubmit}>
  //         <Input
  //           type="email"
  //           name="email"
  //           value={email}
  //           onChange={(e) => handleChangeEmail(e)}
  //         />
  //         <Input
  //           type="password"
  //           name="password"
  //           value={password}
  //           onChange={(e) => handleChangePassword(e)}
  //         />
  //         <Button>Login</Button>
  //       </Form>
  //     </Wrapper>
  //     <Wrapper>
  //       <Form onSubmit={handleSubmit}>
  //         <Input
  //           type="email"
  //           name="email"
  //           value={email}
  //           onChange={(e) => handleChangeEmail(e)}
  //         />
  //         <Input
  //           type="password"
  //           name="password"
  //           value={password}
  //           onChange={(e) => handleChangePassword(e)}
  //         />
  //         <Button>Login</Button>
  //       </Form>
  //     </Wrapper>

  //   </>
  // );

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        user: {user}
        <Form>{renderStep()}</Form>
      </Wrapper>
    </>
  );
}

export default Register;
