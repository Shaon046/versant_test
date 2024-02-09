import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setTimer } from "../../redux/testSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const TimerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;

  font-weight: 600;
  font-size: 30px;
  color: ${({ timeLeft }) =>
    timeLeft < 3 ? "#ff3a62" : timeLeft < 10 ? "gray" : "#27a909"};
  width: 180px;
  border: 1px solid
    ${({ timeLeft }) =>
      timeLeft < 3 ? "#ff3a62" : timeLeft < 10 ? "gray" : "#27a909"};
  border-radius: 40px;
`;

const Timer = ({ initialDuration }) => {
  const dispatch = useDispatch();

  const testStarted = useSelector((state) => state.test.testStarted);

  const [timeLeft, setTimeLeft] = useState(initialDuration);

  useEffect(() => {
    if (testStarted) {
      if (timeLeft >= 0) {
        const intervalId = setInterval(() => {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);
        dispatch(setTimer(timeLeft));
        return () => clearInterval(intervalId);
      }
    }
  }, [timeLeft, testStarted]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <TimerDiv timeLeft={timeLeft}>
      {timeLeft >= 0 ? (
        formatTime(timeLeft)
      ) : (
        <p style={{ color: "#ff1744", fontWeight: "600" }}> {"Time's up!"}</p>
      )}
    </TimerDiv>
  );
};

export default Timer;
