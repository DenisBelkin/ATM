import {combineReducers} from 'redux';

import pinCounter from './pinCounter';
import atmBalanceReducer from "./atmBalanceReducer";
import userBalanceReducer from "./userBalanceReducer";
import alertReducer from "./alert";

export default combineReducers({
    pinCounter: pinCounter,
    atmBalance: atmBalanceReducer,
    userBalance: userBalanceReducer,
    alert:alertReducer,
})