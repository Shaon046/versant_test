import React from "react";
import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #c7d7e4;
`;

const MessageOne = styled.p`
  margin-bottom: 10px;
  text-align: center;
  font-size: larger;
  font-weight: 500;
`;

const MessageTwo = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-size: medium;
  font-weight: 400;
`;

const StartTest = () => {
  const onReadyHandler = () => {
    console.log(first);
  };

  return (
    <Container>
      <MessageOne>
        {
          " Get ready to challenge your knowledge with our MCQ Test. This test is designed to evaluate your understanding of given topic through a series of multiple-choice questions. Put your thinking cap on and prepare to showcase your skills!"
        }
      </MessageOne>

      <MessageTwo>
        {
          "When you're ready to begin, click the Start button below to dive into the questions and demonstrate your expertise. Let's get started!"
        }
      </MessageTwo>

      <PrimaryButton
        OnClick={() => {
          onReadyHandler();
        }}
      >
        ready
      </PrimaryButton>
    </Container>
  );
};

export default StartTest;
