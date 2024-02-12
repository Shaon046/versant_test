import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  started: false,
  ended: false,
  timeLeft: null,
  testStarted:false,
  mcqTestEnded:false,
};

const testSlice = createSlice({
  name: "test",
  initialState: initialState,
  reducers: {
    setStart(state, action) {
      return (state = { ...state, started: true });
    },
    setEnd(state, action) {
      return (state = { ...state, ended: true });
    },
    setTimer(state, action) {
      return (state = { ...state, timeLeft: action.payload });
    },

    setTestStarted(state,action){
        return (state = { ...state, testStarted: action.payload });
    },
    setMcqTestEnded(state,action){
      return (state={...state, mcqTestEnded: action.payload})
    }
  },
});

export const { setStart, setEnd, setTimer ,setTestStarted,setMcqTestEnded} = testSlice.actions;
export const testReducers = testSlice.reducer;
