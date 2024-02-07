import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styled from "styled-components";
import { keyframes } from "styled-components";
import PrimaryButton from "./PrimaryButton";

const MainContainer = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  background: #7e7a7a;
  border: 1px solid var(--main-border-color);
  background-color: var(--main-primary-color);
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 0.9rem;
  }
`;
const QuestionConatiner = styled.p`
  text-align: left;
  padding: 20px 0 20px 0;
`;




const VoiceTest = () => {
  const dummy =
    "Loasrem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, amet.";



    const [isRecording, setIsRecording] = useState(false);

    const handleRecordClick = () => {
      setIsRecording((prevState) => !prevState);
    };


  return (
    <>
      <MainContainer>
        <QuestionConatiner>{"1." + dummy}</QuestionConatiner>

       

        <div style={{ padding: "40px" }}>
          {" "}
          <PrimaryButton>Submit</PrimaryButton>  
        </div>

      </MainContainer>
    </>
  );
};

export default VoiceTest;
