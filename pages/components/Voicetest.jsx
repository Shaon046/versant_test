import React, { useState, useEffect, useRef } from "react";

const VoiceTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  useEffect(() => {
    if (isRecording) {
      let stream;

      navigator.mediaDevices.getUserMedia({ audio: true }).then((recordedStream) => {
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
    <div>
      <h1>Voice Recorder</h1>
      {!isRecording ? (
        <button onClick={handleStartRecording}>Start Recording</button>
      ) : (
        <button onClick={handleStopRecording}>Stop Recording</button>
      )}
      {audioUrl && (
        <audio controls src={audioUrl}></audio>
      )}
    </div>
  );
};

export default VoiceTest;
