import { MainContext } from "../context/MainContext.jsx";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const ModalWrapper = styled.div`
  position: absolute;
  top: 86px;
  right: 8px;
  width: auto;
  height: auto;
  // background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  text-align: left;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 5px;
`;

const ModalHeader = styled.div`
  // margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  flex: 1;
`;

const ModalBody = styled.div`
  // height: 200px;
  height: 0px;
  overflow: scroll;
  transition: 0.3s;

  &.open {
    height: 200px;
  }
`;

const ModalCard = styled.div`
  width: 400px;
  height: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding:0.5rem;
  border-radius 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;
const CardTitle = styled.h2`
  margin: 0;
  font-weight: 500;
`;
const CardDetails = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;
const CardBtnContainer = styled.div`
  margin: 0;
  display: flex;
`;

function Modal({ search }) {
  const {
    fetchIncidentTypes,
    fetchDeclarations,
    declarations,
    postDeclaration,
    user,
  } = useContext(MainContext);

  const [open, setOpen] = useState(false);

  const handleFetchData = async () => {
    const result = await fetchDeclarations();
  };
  const handleSearch = (e, item) => {
    e.preventDefault();
    search(item);
  };
  const handleOpen = (e) => {
    e.preventDefault();
    // search(item);
    setOpen(!open);
  };

  useEffect(() => {
    handleFetchData();
    console.log(declarations, " declarations MODALLL");
  }, []);

  if (!declarations)
    return (
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Incidents</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Player
              autoplay
              loop
              src="https://assets7.lottiefiles.com/packages/lf20_b88nh30c.json"
              style={{ height: "100px", width: "100px" }}
            >
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    );

  return (
    <ModalWrapper>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Incidents</ModalTitle>
          <p onClick={handleOpen}>arrow</p>
        </ModalHeader>
        <ModalBody className={open ? "open" : ""}>
          {declarations.map((item) => {
            return (
              <ModalCard key={item.id}>
                <div style={{ flex: "1" }}>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDetails>{item.details}</CardDetails>
                </div>
                <CardBtnContainer>
                  <button
                    style={{ color: "#ffffff", background: "blue" }}
                    onClick={(e) => handleSearch(e, item)}
                  >
                    Search
                  </button>
                </CardBtnContainer>
              </ModalCard>
            );
          })}
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
