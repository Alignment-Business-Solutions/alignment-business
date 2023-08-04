const endBalance = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_END_BALANCE' :
            return action.payload;
        default :
            return state
    }
}

export default endBalance;