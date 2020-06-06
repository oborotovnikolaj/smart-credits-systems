import {combineReducers} from "redux";
import streamReducer from "./fabricReducer";
import {reducer as formReducer} from "redux-form";


export default combineReducers({
    fabricReducer: streamReducer,
    form: formReducer
});