import _ from 'lodash';
import {APPROVE_CREDIT_BY_BANK, CLOSE_CREDIT_BY_BANK, FETCH_BANK_DATA, PAY_CREDIT_BY_BANK} from "../actions/types";

export default (state ={}, action) => {
    switch (action.type) {
        case FETCH_BANK_DATA:
            return { ...state,  ..._.mapKeys(action.payload, 'address')  };
            // return { ...state,  ..._.mapKeys(action.payload, '0')  };
        case APPROVE_CREDIT_BY_BANK:
            return { ...state, [action.payload.address]: {...action.payload }};
        case PAY_CREDIT_BY_BANK:
            return { ...state, ..._.mapKeys(action.payload, '0')  };
        case CLOSE_CREDIT_BY_BANK:
            return { ...state, [action.payload.address]: {...action.payload }};
        default:
            return state;
    }
}