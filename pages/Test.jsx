import React from "react";
import styled from "styled-components";
import McqTest from "./components/McqTest";
import VoiceTest from "./components/Voicetest";
import NavBar from "./components/NavBar";
import StartTest from "./components/StartTest";
import { useSelector } from "react-redux";

const MainContainer = styled.div`
  height: 100vh;
  background-color: var(--main-bg-color);
  overflow: hidden;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  color: gray;
  font-size: 2rem;
  font-weight: 600;

  @media (max-width: 767px) {
    font-size: 0.8rem;
  }

  @media (min-width: 767px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1200px) {
    font-size: 2rem;
  }
`;
const Message = styled.p`
  transform: translate(0%, -100%);
  text-align: center;
`;

const Test = () => {
  //hooks
  const { confirmTostart, mcqTestEnded, testStarted, voiceTestEnded } =
    useSelector((state) => state.test);
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <>
      <MainContainer>
        <NavBar />

        {isAuth && (
          <>
            {!confirmTostart && <StartTest />}

            {!(mcqTestEnded && voiceTestEnded) && (
              <>
                {confirmTostart && !mcqTestEnded && <McqTest />}
                {confirmTostart && mcqTestEnded && <VoiceTest />}{" "}
              </>
            )}

            {confirmTostart && mcqTestEnded && voiceTestEnded && (
              <MessageContainer>
                {" "}
                <Message>
                  Your score will be shared with your interviewer
                </Message>
                <Message>Best of luck!</Message>
              </MessageContainer>
            )}
          </>
        )}

        {!isAuth && (
          <MessageContainer>
            <Message>
              Sorry, you do not have permission to access this page. Please
              contact the administrator for assistance.
            </Message>
          </MessageContainer>
        )}
      </MainContainer>
    </>
  );
};

export default Test;
