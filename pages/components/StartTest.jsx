import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { setStart } from "../../redux/testSlice";
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const StartTest = () => {
  //hooks
  const dispatch = useDispatch();

  const onReadyHandler = () => {
    dispatch(setStart());
    console.log("CLICKED");
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

      <ButtonContainer>
        <Button
          variant="contained"
          aria-label="outlined primary button group"
          size="medium"
          onClick={onReadyHandler}
        >
          ready
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default StartTest;
