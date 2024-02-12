import styled from "styled-components";
import {
  FormGroup,
  TextField,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Button } from "@mui/material";

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

  const onLoginHandler = () => {
    dispatch(setAuth(true));

    router.push("/Test");
  };

  return (
    <MainContainer>
      <FormContainer>
        <FormGroup>
          <TextField
            name="temp_id"
            id="temp_id"
            label="Temp Id"
            variant="filled"
            sx={{ m: 1, width: "335px" }}
            required
          />
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
