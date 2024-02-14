import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmTostart: false,

  timeLeft: null,

  testStarted: false,

  voiceTestEnded:false,
  mcqTestEnded: false,
};

const testSlice = createSlice({
  name: "test",
  initialState: initialState,
  reducers: {
    setConfirmTostart(state, action) {
      return (state = { ...state,  confirmTostart: true });
    },
    setEnd(state, action) {
      return (state = { ...state, ended: true });
    },
    setTimer(state, action) {
      return (state = { ...state, timeLeft: action.payload });
    },

    setTestStarted(state, action) {
      return (state = { ...state, testStarted: action.payload });
    },
    setMcqTestEnded(state, action) {
      return (state = { ...state, mcqTestEnded: action.payload });
    },

    setVoiceTestEnded(state, action) {
      return (state = { ...state, voiceTestEnded: action.payload });
    },
  },
});

export const { setConfirmTostart, setEnd, setTimer, setTestStarted, setMcqTestEnded ,setVoiceTestEnded} =
  testSlice.actions;
export const testReducers = testSlice.reducer;
