const recentPL = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECENT_PL':
            return action.payload;
        default:
            return state;
    }
}

export default recentPL;