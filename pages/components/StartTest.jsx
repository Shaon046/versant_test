import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { setConfirmTostart } from "../../redux/testSlice";

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

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CountdownText = styled.h1`
  border: 3px solid white;
  border-radius: 60px;
  height: 7rem;
  width: 7rem;
  font-size: 5rem;
  color: white;
  text-align: center;
  transform: translate(0, -50%);
`;

const StartTest = () => {
  // Hooks
  const dispatch = useDispatch();
 

  // Handler for start button click
  const onReadyHandler = () => {
     dispatch(setConfirmTostart());
      console.log("CLICKED");
   
  };

 

  return (
    <Container>
       
        <>
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
              Ready
            </Button>
          </ButtonContainer>
        </>
  

      
    </Container>
  );
};

export default StartTest;
