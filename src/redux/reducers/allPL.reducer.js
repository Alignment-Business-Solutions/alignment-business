const allPL = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALLPL':
        return [...state, action.payload];
      case 'LOGOUT':
        return [];
      default:
        return state;
    }
  };
  
  export default allPL;
