import {configureStore} from "@reduxjs/toolkit";
import {authReducers} from "../authSlice"
import {testReducers} from "../testSlice"

const store=configureStore({
    reducer:{auth:authReducers,test:testReducers}
})


export default store