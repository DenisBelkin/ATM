const initialState = 1;
const pinCounter = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_PIN':
            return action.payload;
        case 'BAD_PIN':
            return state + 1;
        case 'GOOD_PIN':
            return 0;
        default:
            return state;
    }
};

export default pinCounter;