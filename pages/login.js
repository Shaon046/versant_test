import React from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import PrimaryButton from "./components/PrimaryButton";

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main-bg-color);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  height: 330px;
  width: 380px;
  border: 1px solid var(--main-border-color);

  background-color: var(--main-primary-color);
`;

const Main = () => {
  return (
    <MainContainer>
      <FormContainer>
        <TextField
          id="user_id"
          label="User Id"
          autoComplete="current-password"
          variant="filled"
          sx={{ m: 1, width: "335px" }}
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          sx={{ m: 1, width: "335px" }}
        />
        <PrimaryButton>Login</PrimaryButton>
      </FormContainer>
    </MainContainer>
  );
};

export default Main;
