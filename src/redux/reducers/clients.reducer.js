const MyClients = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_MY_CLIENTS' :
            return action.paylaod;
        default :
            return state
    }
}