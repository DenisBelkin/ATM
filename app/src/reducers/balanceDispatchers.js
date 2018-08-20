
export const mapStateToProps = state => {
    return {
        atmBalance: state.atmBalance,
        userBalance: state.userBalance
    }
};

export const mapDispatchToProps = dispatch => {
    return {
        initUserBalance: (payload) => dispatch({
            type: 'INIT_USER_BALANCE',
            payload
        }),
        initAtmBalance: (payload) => dispatch({
            type: 'INIT_ATM_BALANCE',
            payload
        }),
        decreaseUserBalance: (payload) => dispatch({
            type: 'DECREASE_USER_BALANCE',
            payload
        }),
        decreaseAtmBalance: (payload) => dispatch({
            type: 'DECREASE_ATM_BALANCE',
            payload
        }),

    }
};