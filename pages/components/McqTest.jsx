import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Timer from "./Timer";
import { data } from "../../dummyQuestion.js";
import { ButtonGroup, Button } from "@mui/material";

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimerContainer = styled.div`
  margin-top: 4px;
`;

const MainContainer = styled.div`
  max-width: 650px;
  margin: 4px auto;
  background: #7e7a7a;
  border: 1px solid var(--main-border-color);
  background-color: var(--main-primary-color);
  border-radius: 4px;

  @media (max-width: 767px) {
    max-width: 400px;
  }

  @media (min-width: 768px) {
    max-width: 600px;
  }

  @media (min-width: 1200px) {
    max-width: 650px;
  }
`;
const QuestionConatiner = styled.p`
  text-align: left;
  padding: 20px 0 20px 0;
  font-weight: 500;
  font-size: 1.2rem;
  background-color: var(--main-border-color);
  width: 100%;

  @media (max-width: 767px) {
    padding: 15px 0 15px 0;
    font-size: 0.9rem;
  }
`;

const OptionsConatiner = styled.p`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 20px;
  padding: 0 0 0 10px;

  .MuiFormControlLabel-label {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .MuiFormControlLabel-label {
      font-size: 0.7rem;
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const McqTest = () => {
  const [question, setQuestion] = useState(data);
  const [timer, setTimer] = useState(120); //// number of question * 60sec

  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setPageCount(question.length);
  }, []);

  ////handler functions
  const onClickNextHandler = () => {
    setCurrentIndex((prev) => prev + 1);

    console.log("calling");
  };

  const onClickPreviousHandler = () => {
    setCurrentIndex((prev) => prev - 1);

    console.log("calling");
  };

  useEffect(() => {
    setCurrentPage(currentIndex + 1);
  }, [currentIndex]);

  const OnSelectHandler = (eve) => {
    console.log(eve);
  };

  return (
    <MainBody>
      <TimerContainer>
        <Timer
          initialDuration={timer}
          height={"30px"}
          width={"150px"}
          fontsize={"16px"}
        />
      </TimerContainer>

      <MainContainer>
        <>
          <QuestionConatiner>
            {question[currentIndex].question}
          </QuestionConatiner>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <OptionsConatiner>
              {question[currentIndex].options.map((data, idx) => (
                <>
                  <FormControlLabel
                    key={idx + "lhe"}
                    value={data}
                    control={<Radio />}
                    label={data}
                    onClick={(eve) => {
                      OnSelectHandler(eve);
                    }}
                  />
                </>
              ))}
            </OptionsConatiner>{" "}
          </RadioGroup>
        </>

        <ButtonContainer>
          {" "}
          <ButtonGroup
            variant="contained"
            aria-label="Basic button group"
            size="small"
          >
            <Button onClick={() => onClickPreviousHandler()}>
              {"previous"}
            </Button>
            <Button onClick={onClickNextHandler}>{"next"}</Button>
          </ButtonGroup>
        </ButtonContainer>

        <PaginationContainer>
          <Stack spacing={2}>
            <Pagination count={pageCount} page={currentPage} />
          </Stack>
        </PaginationContainer>
      </MainContainer>
    </MainBody>
  );
};

export default McqTest;
