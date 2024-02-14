import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(state, action) {
      return { ...state, isAuth: action.payload };
    },
    setId(state,action){
      return state={...state,id:action.payload}
    }

  },
});

export const { setAuth,setId } = authSlice.actions;
export const authReducers = authSlice.reducer;
