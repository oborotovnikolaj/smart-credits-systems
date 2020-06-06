import _ from 'lodash';
import {FETCH_CREDITS, FETCH_DATA} from "../actions/types";
import {BLOCKCHAIN_DATA} from "../Constants";

export default (state ={}, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, [BLOCKCHAIN_DATA]: action.payload };
        case FETCH_CREDITS:
            return { ...state, [BLOCKCHAIN_DATA]: {...action.payload }};
        default:
            return state;
    }
}