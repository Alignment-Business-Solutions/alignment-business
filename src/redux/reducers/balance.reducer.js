

const Balance = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_BALANCE' :
            return action.payload;
        case 'LOGOUT2':
            return [];
        default :
            return state
    }
}

export default Balance;
