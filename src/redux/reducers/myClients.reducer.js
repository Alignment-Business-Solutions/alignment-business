

const MyClients = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_MY_CLIENTS' :
            return action.payload;
       case 'LOGOUT':
        return [];
        default :
            return state
    }
}

export default MyClients;
