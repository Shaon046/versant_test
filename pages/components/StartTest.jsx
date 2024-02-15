import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { setConfirmTostart } from "../../redux/testSlice";
import Checkbox from '@mui/material/Checkbox';
import { Margin } from "@mui/icons-material";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background: var(--main-gradient-white);
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;


const Disclaimer=styled.div`
margin-top: 30px;
  height:400px;
  width: 60%;
  padding: 18px;
  overflow: scroll;
  background-color: aliceblue;
 

`


const StartTest = () => {
  // Hooks
  const dispatch = useDispatch();
 
  const [checked, setChecked] =useState(false);




  // Handler for start button click
  const onReadyHandler = () => {
     dispatch(setConfirmTostart());
      console.log("CLICKED");
   
  };

 // TermsAndCondition handler function

 const handleChange = (event) => {
  setChecked(event.target.checked);
};



  return (
    <Container>
       <Disclaimer>
       <h1>Disclaimer</h1>

<p>This online test consists of two parts: a multiple-choice questionnaire (MCQ) and the Versant English Proficiency Test. By participating in this test, you acknowledge and agree to the following terms and conditions:</p>
<ol>
<li><strong>Eligibility:</strong> This test is open to individuals who meet the specified criteria for participation as determined by the test administrator.</li>
<li><strong>Validity:</strong> The results of this test are valid only for the purpose intended by the test administrator and may not be used for any other purpose without explicit permission.</li>
<li><strong>Accuracy:</strong> While every effort has been made to ensure the accuracy of the test questions and scoring mechanisms, the test administrator does not guarantee the absolute accuracy of the results.</li>
<li><strong>Confidentiality:</strong> All information provided by participants during the test, including personal data and responses, will be treated as confidential and will only be used for the purpose of evaluating test performance.</li>
<li><strong>Prohibited Activities:</strong> Participants are prohibited from engaging in any form of cheating, including but not limited to plagiarism, collusion, or using unauthorized aids during the test. Any violation of this policy may result in disqualification and further actions as deemed appropriate by the test administrator.</li>
<li><strong>Technical Issues:</strong> The test administrator is not responsible for any technical issues experienced by participants during the test, including but not limited to internet connectivity problems, computer malfunctions, or software errors. Participants are advised to ensure they have a stable internet connection and compatible device before starting the test.</li>
<li><strong>Feedback and Results:</strong> Participants may receive feedback on their performance in accordance with the policies established by the test administrator. However, participants should note that individual test scores and results may not be disclosed to third parties without consent, except as required by law.</li>
<li><strong>Modification or Termination:</strong> The test administrator reserves the right to modify, suspend, or terminate the test, or any part thereof, at any time and for any reason without prior notice.</li>
</ol>

<ol>
<li><strong>Eligibility:</strong> Participants must meet the specified criteria for participation as determined by the test administrator.</li>
<li><strong>Registration:</strong> Participants are required to provide accurate and complete information during the registration process.</li>
<li><strong>Test Conduct:</strong> Participants must conduct themselves in a professional and ethical manner during the test, adhering to all instructions provided by the test administrator.</li>
<li><strong>Intellectual Property:</strong> All test materials, including questions, content, and software, are the intellectual property of the test administrator and may not be reproduced, distributed, or used for any purpose without explicit permission.</li>
<li><strong>Feedback:</strong> Participants may receive feedback on their performance in accordance with the policies established by the test administrator.</li>
<li><strong>Data Privacy:</strong> The test administrator will collect, process, and store personal data in accordance with applicable data protection laws and regulations.</li>
<li><strong>Liability:</strong> The test administrator is not liable for any direct or indirect damages arising from participation in the test, including but not limited to technical issues, loss of data, or interruption of service.</li>
<li><strong>Dispute Resolution:</strong> Any disputes arising from or related to the test shall be resolved through negotiation, mediation, or arbitration in accordance with the rules and procedures established by the test administrator.</li>
<li><strong>Modification:</strong> The test administrator reserves the right to modify these terms and conditions at any time without prior notice.</li>
<li><strong>Termination:</strong> The test administrator reserves the right to terminate or suspend the test, or any part thereof, at any time and for any reason without prior notice.</li>
</ol>
<p>By proceeding with this test, you indicate your understanding of and agreement to abide by these terms and conditions. If you do not agree with any of these terms, you should not participate in the test.</p>

<FormControlLabel
        label={
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Yes, I agree to the terms and conditions
          </Typography>
        }
        control={
          <Checkbox
            checked={checked}
           
            onChange={handleChange}
          />
        }
      />
       </Disclaimer>
      

<ButtonContainer>
            <Button
              variant="contained"
              aria-label="outlined primary button group"
              size="medium"
              onClick={onReadyHandler}
              disabled={!checked}
            >
              Start
            </Button>
          </ButtonContainer>
        
    </Container>
  );
};

export default StartTest;
