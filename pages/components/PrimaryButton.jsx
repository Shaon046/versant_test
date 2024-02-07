import React from "react";

import { Button } from "@mui/material";
import styled from "styled-components";
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const PrimaryButton = ({onClick,disabled,children}) => {
  return (
    <>
      <ButtonContainer>
        <Button
          variant="contained"
          aria-label="outlined primary button group"
          size="medium"
          onClick={(eve)=>onClick(eve) }
          disabled={disabled}
        >
          {children}
        </Button>
      </ButtonContainer>
    </>
  );
};


export default PrimaryButton;
