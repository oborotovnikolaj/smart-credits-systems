import {combineReducers} from "redux";
import streamReducer from "./fabricReducer";
import {reducer as formReducer} from "redux-form";
import bankReducer from "./bankReducer";
import creditReducer from "./creditReducer";
import shopReducer from "./shopReducer";
import ofdReducer from "./ofdReducer";


export default combineReducers({
    fabricReducer: streamReducer,
    bankReducer: bankReducer,
    creditReducer: creditReducer,
    shopReducer: shopReducer,
    ofdReducer: ofdReducer,
    form: formReducer
});