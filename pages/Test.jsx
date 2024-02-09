import React from "react";
import styled from "styled-components";
import McqTest from "./components/McqTest";
import VoiceTest from "./components/Voicetest";
import NavBar from "./components/NavBar";
import StartTest from "./components/StartTest";
import { useSelector } from "react-redux";

import Wave from "./components/Wave";

const MainContainer = styled.div`
  height: 100vh;
  background-color: var(--main-bg-color);
  overflow: hidden;
`;

const Test = () => {
  //hooks
  const started = useSelector((state) => state.test.started);

  return (
    <>
      <MainContainer>
        <NavBar />

        {/* {!started && <StartTest />}

        {started && <McqTest />} */}

        {!started && <StartTest />}

        {started && <VoiceTest />}
      </MainContainer>
    </>
  );
};

export default Test;
