import {FETCH_CREDIT_DATA} from "../actions/types";
import {ACTIVE_CREDIT_DATA} from "../Constants";

export default (state ={}, action) => {
    switch (action.type) {
        case FETCH_CREDIT_DATA:
            return { ...state,  [ACTIVE_CREDIT_DATA]: action.payload };
            // return { ...state,  action.payload};
        default:
            return state;
    }
}