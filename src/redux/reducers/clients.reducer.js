

const AllClients = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_ALL_CLIENTS' :
            return action.payload;
        case 'LOGOUT2':
            return [];
        default :
            return state
    }
}

export default AllClients;
