import React, { useState } from "react";
import styled from "styled-components";
import { FormGroup, TextField } from "@mui/material";
import PrimaryButton from "./components/PrimaryButton";
import { IconButton, InputAdornment, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";

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
  //dispatch function
  const dispatch = useDispatch();

  //states
  const [userDetails, setUserDetails] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [buttonActive, setButtonActive] = useState();

  const [isRequired, setIsRequired] = useState({});
  const [inputLengthCheck, setInputLengthCheck] = useState({});

  //input onchange handler function
  const inputOnChange = (eve) => {
    const { name, value } = eve.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  //input blur handler function && input required validation
  const onInputBlur = (eve) => {
    const { name, value } = eve.target;

    if (!userDetails.user_id || userDetails.user_id.trim() === "") {
      setIsRequired((prevState) => ({ ...prevState, user_id: true }));
    } else {
      setIsRequired((prevState) => ({ ...prevState, user_id: false }));
    }

    if (!userDetails.password || userDetails.password.trim() === "") {
      setIsRequired((prevState) => ({ ...prevState, password: true }));
    } else {
      setIsRequired((prevState) => ({ ...prevState, password: false }));
    }

    ////input length check
    if (name === "user_id") {
      if (value.length > 0 && value.length < 5) {
        setInputLengthCheck((prevState) => ({
          ...prevState,
          user_id: true,
        }));
      } else {
        setInputLengthCheck((prevState) => ({
          ...prevState,
          user_id: false,
        }));
      }
    }

    if (name === "password") {
      if (value.length > 0 && value.length < 5) {
        setInputLengthCheck((prevState) => ({
          ...prevState,
          password: true,
        }));
      } else {
        setInputLengthCheck((prevState) => ({
          ...prevState,
          password: false,
        }));
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //loging logic
  const onLoginHandler = () => {
    dispatch(setAuth(true));
  };

  return (
    <MainContainer>
      <FormContainer>
        <FormGroup>
          <TextField
            name="user_id"
            id="user_id"
            label="User Id"
            autoComplete="current-password"
            variant="filled"
            sx={{ m: 1, width: "335px" }}
            required
            onChange={(eve) => {
              inputOnChange(eve);
            }}
            onBlur={(eve) => onInputBlur(eve)}
          />
          {isRequired.user_id && (
            <FormHelperText sx={{ ml: 1, color: "red" }}>
              Username is required
            </FormHelperText>
          )}
          {inputLengthCheck.user_id && (
            <FormHelperText sx={{ ml: 1, color: "red" }}>
              Username must be at least 5 characters long
            </FormHelperText>
          )}

          <TextField
            name="password"
            id="Password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            variant="filled"
            sx={{ m: 1, width: "335px" }}
            required
            onChange={(eve) => {
              inputOnChange(eve);
            }}
            onBlur={(eve) => onInputBlur(eve)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isRequired.password && (
            <FormHelperText sx={{ ml: 1, color: "red" }}>
              Password is required
            </FormHelperText>
          )}
          {inputLengthCheck.password && (
            <FormHelperText sx={{ ml: 1, color: "red" }}>
              Password must be at least 8 characters long
            </FormHelperText>
          )}
        </FormGroup>

        <PrimaryButton onClick={onLoginHandler}>Login</PrimaryButton>
      </FormContainer>
    </MainContainer>
  );
};

export default Main;
