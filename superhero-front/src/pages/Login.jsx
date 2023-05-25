import { useState, useMemo, useEffect, useContext } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";

import "../App.css";
import { MainContext } from "../context/MainContext";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

// const GlobalStyle = createGlobalStyle`
//   * {
//     padding: 0;
//     margin: 0;
//     box-sizing: border-box;
//     background: #FDF9F3;
//   }

//   body, html, #root {
//     height: 100%;
//     font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
//   }
// `;

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

function Login() {
  const { fetchUsers, user, setUser, postLogin, setUsername, setToken } =
    useContext(MainContext);

  const [hasError, setHasError] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    let params = {
      file: false,
      token: user,
    };

    try {
      const response = await postLogin(data, params);
      if (response.status === 200 || response.status === 201) {
        setUser(response.data.jwt);
        setToken(response.data.jwt);
        setUsername(response.data.username);
        navigate("/");
      } else {
        throw new Error("Erreur HTTP ");
      }
    } catch (e) {
      console.log("l'erruer ma gueule: ", e);
      setHasError("Bad Creds");
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setHasError(false);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setHasError(false);
  };
  const handlefetch = async (e) => {
    // let result = await fetchUsers();
    // setExam(result);
  };

  useEffect(() => {
    // handlefetch();
  }, []);

  return (
    <>
      {/* Le user: {user} */}
      {/* <GlobalStyle /> */}
      <Wrapper style={{ background: "#FDF9F3" }}>
        <Form>
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
          <Button onClick={handleSubmit}>Next</Button>
        </Form>
        {hasError ?? null}
      </Wrapper>
    </>
  );
}

export default Login;
