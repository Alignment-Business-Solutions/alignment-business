const weeksDropdown = (state = [], action) => {
    switch (action.type) {
        case 'SET_WEEKS_DROPDOWN':
            return action.payload;
        default:
            return state;
    }
}

export default weeksDropdown;