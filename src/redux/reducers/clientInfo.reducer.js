const clientInfo = ( state = {}, action ) => {
    switch (action.type) {
        case 'SET_CLIENT_INFO' :
            return action.payload;
       case 'LOGOUT':
        return [];
        default :
            return state
    }
}

export default clientInfo;
