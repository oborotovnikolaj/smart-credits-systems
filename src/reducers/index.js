import {combineReducers} from "redux";
import streamReducer from "./fabricReducer";
import {reducer as formReducer} from "redux-form";
import bankReducer from "./bankReducer";
import creditReducer from "./creditReducer";


export default combineReducers({
    fabricReducer: streamReducer,
    bankReducer: bankReducer,
    creditReducer: creditReducer,
    form: formReducer
});