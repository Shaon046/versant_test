import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Timer from "./Timer";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTestStarted, setVoiceTestEnded } from "../../redux/testSlice";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";

const Body=styled.div`
  height: 100vh;
  width: 100vh;
  background-color: #041b2f;
`



const MainContainer = styled.div`
  width: 650px;
  min-height: 200px;
  margin: 20px auto;
  border: 1px solid var(--main-border-color);
  background-color: var(--main-primary-color);

  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: height 4s;

  @media (max-width: 767px) {
    margin-top: 40px;
    max-width: 300px;
  }

  @media (min-width: 768px) {
    margin-top: 40px;
    max-width: 600px;
  }

  @media (min-width: 1200px) {
width: 650px;
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

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Text = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  text-align: center;
  transform: translate(0, -100%);

  @media (max-width: 767px) {
    font-size: 0.9rem;
  }

  @media (min-width: 767px) {
    font-size: 1rem;
  }

  @media (min-width: 1200px) {
    font-size: 1.2rem;
  }
`;

const CountdownText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 8px solid #e0c1c1;
  border-radius: 60px;
  height: 7rem;
  width: 7rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
`;

const VoiceTest = () => {
  const dispatch = useDispatch();

  const texts = " what is JavaScript and why should we use it ? ";
  const [question, setQuestion] = useState(texts);

  // const [stoped, setStoped] = useState(false); //forgot where did i use it
  const [timer, setTimer] = useState(15);

  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);

  // useSelector
  const { timeLeft } = useSelector((state) => state.test);
  const { id } = useSelector((state) => state.auth);

  //////show count before star
  setTimeout(() => {
    setLoading(false);
  }, count * 1000);

  useEffect(() => {
    let timer;
    if (loading && count > 0) {
      timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [count, loading]);

  //////show count before star

  useEffect(() => {
    const autoSpeechQuestion = () => {
      if (!loading) {
        const utterance = new SpeechSynthesisUtterance(question);
        speechSynthesis.speak(utterance);

        utterance.onend = () => {
          setIsRecording(true);
          dispatch(setTestStarted(true));
          console.log("recording started");
        };
      }
    };

    autoSpeechQuestion();
  }, [loading]);

  //// add data to db
  const addDataToDb = async (data) => {
    try {
      const docRef = await addDoc(collection(db, id), {
        audioFile: data,
      });
      console.log("data added", docRef.id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

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

                dispatch(setTestStarted(false));
                dispatch(setVoiceTestEnded(true));
              }
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
      // setStoped(true);
      setIsRecording(false);
    }
  }, [timeLeft]);

  console.log(timer);

  return (
    <>
      {!loading && (
        
        <MainContainer>
          <QuestionConatiner>{question}</QuestionConatiner>

          <RecorderContainer>
            <Timer
              initialDuration={timer}
              height={"50px"}
              width={"180px"}
              fontsize={"30px"}
            />

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
      )}

      {loading && (
        <CountdownContainer>
          <Text>
            Welcome to the Versant test! stay focused, and be ready. Best of
            luck in demonstrating your language proficiency!
          </Text>
          <CountdownText>{count}</CountdownText>
        </CountdownContainer>
      )}
    </>
  );
};

export default VoiceTest;
