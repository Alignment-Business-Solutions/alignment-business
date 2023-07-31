const weeksDropdown = (state = [], action) => {
    switch (action.type) {
        case 'SET_WEEKS_DROPDOWN':
            return action.payload;
       case 'LOGOUT2':
        return [];
        default:
            return state;
    }
}

export default weeksDropdown;
