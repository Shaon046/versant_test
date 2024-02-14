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
  background: var(--main-gradient-white);
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
