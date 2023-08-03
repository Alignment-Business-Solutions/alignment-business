const recentBalance = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_RECENT_BALANCE' :
            return action.payload[0];
        default :
            return state
    }
}

export default recentBalance;