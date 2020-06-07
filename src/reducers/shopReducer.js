import _ from 'lodash';
import {FETCH_SHOP, FETCH_SHOP_DATA} from "../actions/types";
import {CREDITS, SHOP} from "../Constants";

export default (state ={CREDITS: {}, SHOP:{} }, action) => {
    switch (action.type) {
        case FETCH_SHOP_DATA:
            return { ...state,  [CREDITS]: _.mapKeys(action.payload, 'address')  };
        case FETCH_SHOP:
            return { ...state,  [SHOP]: action.payload};
        default:
            return state;
    }
}