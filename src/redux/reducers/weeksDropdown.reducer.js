const weeksDropdown = (state = [], action) => {
    switch (action.type) {
        case 'SET_WEEKS_DROPDOWN':
            return action.payload;
       case 'LOGOUT':
        return [];
        default:
            return state;
    }
}

export default weeksDropdown;
