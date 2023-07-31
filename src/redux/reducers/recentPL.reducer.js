const recentPL = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECENT_PL':
            return action.payload;
       case 'LOGOUT2':
        return [];
        default:
            return state;
    }
}

export default recentPL;
