const clientInfo = ( state = {}, action ) => {
    switch (action.type) {
        case 'SET_CLIENT_INFO' :
            return action.payload;
        default :
            return state
    }
}

export default clientInfo;