import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PrimaryButton from "./PrimaryButton";
import Timer from "./Timer";
import { data } from "../../dummyQuestion.js";

const MainContainer = styled.div`
  max-width: 650px;
  margin: 20px auto;
  background: #7e7a7a;
  border: 1px solid var(--main-border-color);
  background-color: var(--main-primary-color);
  border-radius: 4px;

  @media (max-width: 767px) {
    margin-top: 40px;
    max-width: 400px;
  }

  @media (min-width: 768px) {
    margin-top: 40px;
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

const TimerContainer = styled.div`
  position: absolute;
  @media (max-width: 767px) {
    position: absolute;

    left: 50%;
    transform: translate(-50%, -100%);
  }

  @media (min-width: 768px) {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -100%);
  }
  @media (min-width: 1200px) {
    left: 85%;
  }
`;

const dummylist = [
  {
    question:
      "1. Loasrem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, amet.",
    options: [
      " Lorem ipsum dolor sit amet consectesdfsdftur adipisicing elit. Enim, magnam.",
      "Lorem ipsum dolor sit, amet consectetsdfur adipsdfsdfisicing elit. Ipsum, amet.",
      " Lorem ipsum dolor, sit amet consectetur adisdfsdfpisicing elit. Quisquam, quasi!",
      "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. dfsdfEt, sint.",
      "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et,sds sint.",
    ],
  },
  // ,{
  //   question:
  //     "1. Loasrem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, amet.",
  //   options: [
  //     " Lorem ipsum dolor sit amet consectesdfsdftur adipisicing elit. Enim, magnam.",
  //     "Lorem ipsum dolor sit, amet consectetsdfur adipsdfsdfisicing elit. Ipsum, amet.",
  //     " Lorem ipsum dolor, sit amet consectetur adisdfsdfpisicing elit. Quisquam, quasi!",
  //     "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. dfsdfEt, sint.",
  //     "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et,sds sint.",
  //   ],
  // },
];

const McqTest = () => {
  const [question, setQuestion] = useState(dummylist);
  const [timer, setTimer] = useState(120); //// number of question * 60sec
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    setPageCount(question.length);
  }, []);

  const onClickNextHandler = () => {
    console.log("calling");
  };

  const OnSelectHandler = (eve) => {
    console.log(eve);
  };

  return (
    <>
      <MainContainer>
        <TimerContainer>
          <Timer initialDuration={timer} />
        </TimerContainer>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {question.map((data, idx) => (
            <>
              <QuestionConatiner key={idx}>{data.question}</QuestionConatiner>

              <OptionsConatiner key={idx + "lhe"}>
                {data.options.map((data, idx) => (
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
              </OptionsConatiner>
            </>
          ))}
        </RadioGroup>

        <div style={{ padding: "20px" }}>
          <PrimaryButton onClick={onClickNextHandler}>{"next"}</PrimaryButton>
        </div>

        <PaginationContainer>
          <Stack spacing={2}>
            <Pagination count={pageCount} />
          </Stack>
        </PaginationContainer>
      </MainContainer>
    </>
  );
};

export default McqTest;
