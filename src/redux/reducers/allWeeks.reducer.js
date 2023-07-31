const allWeeks = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_WEEKS':
        return action.payload;
      case 'LOGOUT':
        return [];
      default:
        return state;
    }
  };
  
  export default allWeeks;
