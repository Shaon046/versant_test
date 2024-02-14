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
import { setAuth,setId } from "../redux/authSlice";
import { useRouter } from "next/router";
import { useState } from "react";

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
 background: var( --main-gradient-white);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  height: 330px;
  width: 380px;
  border: 1px solid var(--main-border-color);
border-radius: 6px;
  background-color: var(--main-primary-color);
`;

const Main = () => {
  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const [tempId, setTempId] = useState(""); 



const onChangeTempIdHandler= (eve)=>{
let tempId=eve.target.value
setTempId(tempId)
}


//////write authentication logic here 
  const onLoginHandler = () => {
    if (!tempId) {
      alert("Please fill in the Temp Id field.");
      return; 
    }
    dispatch(setId(tempId))
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
            onChange={(eve)=>onChangeTempIdHandler(eve)}
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
