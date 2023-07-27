const clientInfo = ( state = {}, action ) => {
    switch (action.type) {
        case 'SET_SELECTED_CLIENT' :
            return action.payload;
        default :
            return state
    }
}

export default clientInfo;
