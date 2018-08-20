import {saveNewData} from "../common/storageData";

const initialState = 0;
const userBalanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_USER_BALANCE' :
            return action.payload;
        case 'DECREASE_USER_BALANCE':
            const newState = (state - action.payload);
            saveNewData('User', 'money',newState);
            return state - action.payload;
        default:
            return state;
    }
};

export default userBalanceReducer;