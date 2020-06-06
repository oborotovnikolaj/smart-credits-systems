import {combineReducers} from "redux";
import streamReducer from "./fabricReducer";
import {reducer as formReducer} from "redux-form";
import bankReducer from "./bankReducer";


export default combineReducers({
    fabricReducer: streamReducer,
    bankReducer: bankReducer,
    form: formReducer
});