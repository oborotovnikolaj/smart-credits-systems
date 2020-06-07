import _ from 'lodash';
import {FETCH_OFD, FETCH_SHOP, FETCH_SHOP_DATA} from "../actions/types";
import {CREDITS, OFD, SHOP} from "../Constants";

export default (state ={OFD: {} }, action) => {
    switch (action.type) {
        case FETCH_OFD:
            return { ...state,  [OFD]: action.payload};
        default:
            return state;
    }
}