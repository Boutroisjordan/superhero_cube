import styled, { keyframes, createGlobalStyle } from "styled-components";

export const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

export const grow = keyframes`
  0% {height: 41px}
  100% {height: 280px}
`;

export const ButtonAjout = styled.button`
  position: absolute;
  bottom: 16px;
  left 16px;
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
  }
  


  }


`;

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  // width: 100%;
  // padding-top: 16px;
  position: absolute;
  bottom: 16px;
  left 16px;
  background: #ffffff;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  animation: ${grow} .2s forwards;
  // animation-duration: 2s;
  animation-timing-function: ease-out;

`;

export const WrapperForm = styled.section`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;
`;
export const WrapperForm2 = styled.section`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;
export const WrapperFlex = styled.section`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
  // height: 100%;
  width: 100%;
  // flex: 1;
`;

export const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

export const TextArea = styled.textarea`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;

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
export const Input = styled.input`
  max-width: 100%;
  width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;

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
export const Select = styled.select`
  max-width: 100%;
  width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;

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

export const Button = styled.button`
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
  // flex: 1;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;
export const CloseButton = styled.button`
  color: #f03d4e;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  z-index: 10;
`;
export const Button2 = styled.button`
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
  // flex: 1;
`;

export const Title = styled.h2`
  font-weight: normal;
  color: #2a2a29;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
export const ResizeDiv = styled.div`
  height: auto;
  transition: 0.3 ease-out;
`;

export const WrapperOptions = styled.div`
  position: absolute;
  top: 45%;
  right: 0;
  left: 0;
  height: 0px;
  overflow-y: scroll;
  // background: #ffffff;
  backdrop-filter: blur(32px);
  color: #111111;

  &.open {
    height: 100px;
  }
`;
export const Option = styled.div`
  // background: #ffffff;
  text-align: left;

  :hover {
    background: #f03d4e;
    color: #ffffff;
    animation: ${jump} 0.2s ease-out forwards;
  }
`;
