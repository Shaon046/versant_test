import { createSlice } from "@reduxjs/toolkit";

const initialState={
    started:false,
    ended:false,
}


const testSlice=createSlice({
    name:'test',
    initialState:initialState,
    reducers:{
        setStart(state,action){
            return state={...initialState,started:true}
        },
        setEnd(state,action){
            return state={...initialState,ended:true}
        }
    }


})


export const { setStart,setEnd } = testSlice.actions;
export const  testReducers = testSlice.reducer;
