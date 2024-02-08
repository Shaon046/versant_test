import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Timer from "./Timer";
const MainContainer = styled.div`

  max-width: 650px;
  margin: 20px auto;
  background: #6f0000;
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
  }`

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

const RecorderContainer=styled.div`
height: 220px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
padding: 20px;

  
`



const VoiceTest = () => {


const texts =" 1. If Peter Piper picked a peck of pickled peppers. ";
const [question,setQuestion]=useState(texts)

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const { speak } = useSpeechSynthesis();
  const autoSpeechQuestion = () => {
    speak({ text: question });
  };
  
  useEffect(() => {
    autoSpeechQuestion();
  }, [question]);
  






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
            const blob = new Blob(chunks.current, { type: "audio/wav" });
            setAudioUrl(URL.createObjectURL(blob)); // Set audioUrl to the Blob URL
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

  const handleStartRecording = () => {
    setIsRecording(true);
   
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <MainContainer>
<QuestionConatiner>{question}</QuestionConatiner>

<RecorderContainer>
<Timer initialDuration={300}/>
{!isRecording ? (
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
    onClick={handleStopRecording}
  >
    stop
  </Button>
)}

{ <audio controls src={audioUrl}></audio>}
</RecorderContainer>
      
    </MainContainer>
  );
};

export default VoiceTest;
