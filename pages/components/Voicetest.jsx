import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Button from "@mui/material/Button";
import Timer from "./Timer";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTestStarted } from "../../redux/testSlice";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";

const MainContainer = styled.div`
  max-width: 650px;

  margin: 20px auto;
  background: #6f0000;
  border: 1px solid var(--main-border-color);
  background-color: var(--main-primary-color);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
  padding: 20px 5px 20px 5px;
  font-weight: 500;
  font-size: 1.2rem;
  background-color: var(--main-border-color);
  width: 100%;

  @media (max-width: 767px) {
    padding: 15px 0 15px 0;
    font-size: 0.9rem;
  }
`;

const RecorderContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const waveAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const StyledWaves = styled.div`
  height: 7px;
  width: 100%;
  overflow: hidden;
`;

const Waves = styled.div`
  height: 100%;
  width: 2000%;
  background: linear-gradient(
    to right,
    #ff5733,
    #ffc300,
    #daf7a6,
    #02d2cb,
    #6117bb,
    #ff33ab,
    #33ff77,
    #b317ff,
    #ffb317,
    #17ffb3,
    #e033ff
  );
  animation: ${waveAnimation} 6s linear infinite;
`;

const zoomAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.2);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  border: 1px solid ${({ started }) => (started === true ? "red" : "gray")};
  border-radius: 100px;
`;

const ZoomIcon = styled(SettingsVoiceIcon)`
  &.zoom {
    animation: ${zoomAnimation} 2s infinite alternate-reverse;
  }
`;

const VoiceTest = () => {
  const dispatch = useDispatch();

  const texts = " what is JavaScript and why should we use it ? ";
  const [question, setQuestion] = useState(texts);

  const [stoped, setStoped] = useState(false);
  const [timer, setTimer] = useState(15);

  const [isRecording, setIsRecording] = useState(false);
  const [audio, setAudio] = useState(null);

  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  // useSelector
  const { timeLeft } = useSelector((state) => state.test);

  console.log(timeLeft);
  const autoSpeechQuestion = () => {
    const utterance = new SpeechSynthesisUtterance(question);
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setIsRecording(true)
      dispatch(setTestStarted(true));
      console.log("recording started");
    };
  };

  //// add data to db

  const addDataToDb = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "mp3"), {
        audioFile: data,
      });
      console.log("data added", docRef.id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  ////text to speech question
  useEffect(() => {
    autoSpeechQuestion();
  }, [question]);

  ////record media and store to db
  useEffect(() => {
    if (isRecording) {
      let stream;

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((recordedStream) => {
          stream = recordedStream;
          mediaRecorder.current = new MediaRecorder(stream);

          mediaRecorder.current.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.current.push(e.data);
            }
          };

          mediaRecorder.current.onstop = () => {
            const blob = new Blob(chunks.current, { type: "audio/mp3" });
            const reader = new FileReader();

            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64 = reader.result;

              if (base64 !== null || "") {
                addDataToDb(base64);
              }
              setAudio(reader.result); ///for testing
            };
            chunks.current = [];
          };

          mediaRecorder.current.start();
        })
        .catch((error) => {
          if (
            error.name === "NotAllowedError" ||
            error.name === "PermissionDeniedError"
          ) {
            const allowPermission = window.confirm(
              "Microphone access is required for recording. Please enable microphone access in your browser settings and try again."
            );
            if (allowPermission) {
              console.log(
                "User denied microphone access. Provide instructions for enabling microphone access in browser settings."
              );
            }
          } else {
            console.error("Error accessing microphone:", error);
          }
        });
    } else if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current = null;
    }
  }, [isRecording]);


  /////stop recording
  useEffect(() => {
    if (timeLeft === 0) {
      setTimer(0);
      setStoped(true);
      setIsRecording(false);
    }
  }, [timeLeft]);

  console.log(timer);

  return (
    <MainContainer>
      <QuestionConatiner>{question}</QuestionConatiner>

      <RecorderContainer>
        <Timer initialDuration={timer} />
        {/* {!isRecording ? (
          <Button
            variant="contained"
            href="#contained-buttons"
            style={{
              borderRadius: "100px",
              height: "60px",
              width: "60px",
              fontSize: "10px",
            }}
            onClick={handleStartRecording}
          >
            start
          </Button>
        ) : (
          <Button
            variant="contained"
            href="#contained-buttons"
            color="error"
            style={{
              borderRadius: "10px",
              height: "60px",
              width: "60px",
              fontSize: "10px",
            }}
            onClick={() => handleStopRecording()}
            disabled={stoped}
          >
            stop
          </Button>
        )} */}

        {/* {<audio controls src={audio}></audio>} */}

        {!isRecording && (
          <>
            <LogoContainer started={isRecording}>
              <ZoomIcon style={{ color: "gray", fontSize: "35px" }} />
            </LogoContainer>
          </>
        )}

        {isRecording && (
          <>
            <LogoContainer>
              <LogoContainer started={isRecording}>
                <ZoomIcon
                  style={{ color: "red", fontSize: "35px" }}
                  className="zoom"
                />
              </LogoContainer>
            </LogoContainer>
          </>
        )}
      </RecorderContainer>
      {isRecording && (
        <StyledWaves>
          <Waves />
        </StyledWaves>
      )}
    </MainContainer>
  );
};

export default VoiceTest;
