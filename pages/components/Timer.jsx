import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TimerDiv = styled.div`
  /* position: absolute; */

  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 180px;
  border: 1px solid var(--main-border-color);
  border-radius: 4px;

  /* @media (max-width: 767px) {
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
  } */
`;

const Timer = ({ initialDuration }) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return <TimerDiv>{formatTime(timeLeft)}</TimerDiv>;
};

export default Timer;
