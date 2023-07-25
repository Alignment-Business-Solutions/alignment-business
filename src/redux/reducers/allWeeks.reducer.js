const allWeeks = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_WEEKS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default allWeeks;