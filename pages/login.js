import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FormGroup,
  TextField,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { useRouter } from "next/router";

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
  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // states{
  const [userInput, setUserInput] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [isRequired, setIsRequired] = useState({});
  const [inputLengthCheck, setInputLengthCheck] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  // }states

  //input onchange handler function
  const inputOnChange = (eve) => {
    const { name, value } = eve.target;
    setUserInput((prevuserInput) => ({
      ...prevuserInput,
      [name]: value,
    }));
  };

  //input blur handler function && input required validation

  // const inputValidation = () => {
  //   const isUserInputEmpty = !userInput.user_id || !userInput.password;
  //   const isUserIdRequired = isRequired.user_id || inputLengthCheck.user_id;
  //   const isPasswordRequired = isRequired.password || inputLengthCheck.password;

  //   setIsDisabled(isUserInputEmpty || isUserIdRequired || isPasswordRequired);
  // };

  const onInputBlur = (eve) => {
    const { name, value } = eve.target;

    if (
      (name === "user_id" && !userInput.user_id) ||
      userInput.user_id === ""
    ) {
      setIsRequired((prevState) => ({ ...prevState, user_id: true }));
    } else if (name === "user_id" && userInput.user_id !== "") {
      setIsRequired((prevState) => ({ ...prevState, user_id: false }));
    }

    if (
      (name === "password" && !userInput.password) ||
      userInput.password === ""
    ) {
      setIsRequired((prevState) => ({ ...prevState, password: true }));
    } else if (name === "password" && userInput.password !== "") {
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

    // inputValidation();              /// error detected
  };

  // Toggle password visibility handler function
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  ////loging logic  handler function

  const onLoginHandler = () => {
    dispatch(setAuth(true));
    ////validation:

    router.push("/Test");
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
              User Id is required
            </FormHelperText>
          )}
          {inputLengthCheck.user_id && (
            <FormHelperText sx={{ ml: 1, color: "red" }}>
              User Id must be at least 4 characters long
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

        <Button
          variant="contained"
          aria-label="outlined primary button group"
          size="medium"
          onClick={() => onLoginHandler()}
        >
          Login
        </Button>
      </FormContainer>
    </MainContainer>
  );
};

export default Main;
