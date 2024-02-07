import React from "react";
import styled from "styled-components";
import McqTest from "./components/McqTest";
import VoiceTest from "./components/Voicetest";
import NavBar from "./components/NavBar";
import Timer from "./components/Timer";
import StartTest from "./components/StartTest";

const MainContainer = styled.div`
  height: 100vh;
  background-color: var(--main-bg-color);
  overflow: hidden;
`;

const Test = () => {
  return (
    <>
      <MainContainer>
        <NavBar />
        {/* <div>
        <StartTest />
        </div> */}
        

               
       <div>
       
          <McqTest />
       </div>
           

        {/* 
           <VoiceTest />
        */}
      </MainContainer>
    </>
  );
};

export default Test;
