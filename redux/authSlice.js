import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  username: null,
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(state, action) {
      return { ...state, isAuth: action.payload };
    },
  },
});

export const { setAuth } = authSlice.actions;
export const authReducers = authSlice.reducer;
