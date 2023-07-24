

const MyClients = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_MY_CLIENTS' :
            return action.payload;
        default :
            return state
    }
}

export default MyClients;