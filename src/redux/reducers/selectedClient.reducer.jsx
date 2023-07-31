const clientInfo = ( state = {}, action ) => {
    switch (action.type) {
        case 'SET_SELECTED_CLIENT' :
            return action.payload;
         case 'LOGOUT':
             return [];
        default :
            return state
    }
}

export default clientInfo;
