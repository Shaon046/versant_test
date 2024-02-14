import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Timer from "./Timer";
import { data } from "../../dummyQuestion.js";
import { ButtonGroup, Button } from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTestStarted, setMcqTestEnded } from "../../redux/testSlice";

import { db } from "../../firebaseConfig";

import { collection, addDoc } from "firebase/firestore";

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
  min-width: 540px;
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


const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Text=styled.div`
  
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  text-align: center;
  transform: translate(0,-100%);


  @media (max-width: 767px) {
    font-size: 0.9rem;
}

@media (min-width: 767px)  {
  font-size: 1rem;
}


@media (min-width: 1200px) {
  font-size: 1.2rem;
}
  
`

const CountdownText = styled.div`
display: flex;
justify-content: center;
align-items: center;
  border: 8px solid  #e0c1c1;
  border-radius: 60px;
  height: 7rem;
  width: 7rem;
  font-size: 1.5rem;
  font-weight:600;
  color: #ffffff;
  text-align: center;
  
;
`;


const McqTest = () => {
  ////hooks
  const dispatch = useDispatch();

  //// useSelector
  const { timeLeft } = useSelector((state) => state.test);
  const { id } = useSelector((state) => state.auth);

  //states
  const [question, setQuestion] = useState(data);
  const [timer, setTimer] = useState(120* question.length); //// 2min for each question

  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // selected answers for each question
  const [userSelectedAnswer, setUserSelectedAnswer] = useState([]);



/////////////////////////////////////////////////////////

const [loading, setLoading]=useState(true)
const [count, setCount] = useState(5);

setTimeout(()=>{
setLoading(false)
},count*1000)


useEffect(() => {
  let timer;
  if (loading && count > 0) {
    timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
  }

  return () => clearTimeout(timer);
}, [count, loading]);




useEffect(()=>{
  
  if(!loading){

    setPageCount(question.length);
    dispatch(setTestStarted(true));
 
  }
    
},[loading])

/////////////////////////////////////////////////////////



  
  useEffect(() => {
    setCurrentPage(currentIndex + 1);
  }, [currentIndex]);

  const handleOptionSelect = (questionIndex, optionValue) => {
    setUserSelectedAnswer((prev) => ({
      ...prev,
      [question[questionIndex].question]: optionValue,
    }));
  };

  // Function to render options for a question
  const renderOptions = (questionIndex) => {
    const selectedAnswer = userSelectedAnswer[question[questionIndex].question];

    return question[questionIndex].options.map((option, idx) => (
      <FormControlLabel
        key={idx}
        value={option}
        control={<Radio />}
        label={option}
        checked={selectedAnswer === option}
        onChange={() => handleOptionSelect(questionIndex, option)}
      />
    ));
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentIndex < pageCount - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentIndex >= 1) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Check if time is up
  useEffect(() => {
    if (timeLeft === 0) {
      dispatch(setTestStarted(false));
      dispatch(setMcqTestEnded(true));
    }
  }, [timeLeft]);

  //// ADD TO DATABASE FUNCTION
  const addDataToDb = async (data) => {
    dispatch(setMcqTestEnded(true));
    try {
      const docRef = await addDoc(collection(db, id), {
        mcq: data,
      });
      console.log("data added", docRef.id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  //// Submit handler function
  const onSubmitHandler = () => {
    addDataToDb(userSelectedAnswer);
    dispatch(setTestStarted(false));
  };

  return (

<>
{
  !loading &&
    <MainBody>
      <TimerContainer>
        <Timer
          initialDuration={timer}
          height={"30px"}
          width={"150px"}
          fontSize={"16px"}
        />
      </TimerContainer>

      <MainContainer>
        <QuestionConatiner>{question[currentIndex].question}</QuestionConatiner>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <OptionsConatiner>{renderOptions(currentIndex)}</OptionsConatiner>
        </RadioGroup>

        {
          <ButtonContainer>
            <ButtonGroup
              variant="contained"
              aria-label="Basic button group"
              style={{ height: "25px" }}
            >
              <Button
                onClick={() => handlePreviousPage()}
                style={{ width: "90px", fontSize: "12px" }}
              >
                {"Prev"}
              </Button>

              {currentPage === question.length ? (
                <Button
                  onClick={() => onSubmitHandler()}
                  color="success"
                  style={{ width: "90px", fontSize: "12px" }}
                >
                  {"Submit"}
                </Button>
              ) : (
                <Button
                  onClick={() => handleNextPage()}
                  style={{ width: "90px", fontSize: "12px" }}
                >
                  {"Next"}
                </Button>
              )}
            </ButtonGroup>
          </ButtonContainer>
        }

        <PaginationContainer>
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              page={currentPage}
              hidePrevButton
              hideNextButton
            />
          </Stack>
        </PaginationContainer>
      </MainContainer>
    </MainBody>

  
  }


{

  loading && 
  <TextContainer>
    <Text> MCQ test starting soon! Get ready to answer multiple-choice questions. Stay focused and do your best! Good luck! </Text>
    <CountdownText>{count}</CountdownText>
  </TextContainer>
}



    </>

  );
};

export default McqTest;
