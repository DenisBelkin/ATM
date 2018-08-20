import {saveNewData} from "../common/storageData";

const initialState = 0;
const atmBalanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_ATM_BALANCE' :
            return action.payload;
        case 'DECREASE_ATM_BALANCE':
            const newState = (state - action.payload);
            saveNewData('ATM', 'money',newState);
            return newState;
        default:
            return state;
    }
};

export default atmBalanceReducer;
