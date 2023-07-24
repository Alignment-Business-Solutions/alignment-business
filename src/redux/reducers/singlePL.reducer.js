
const singlePLReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WEEK_DATA':
      return action.payload;
    case 'UNSET_WEEK_DATA':
      return [];
    default:
      return state;
  }
};

export default singlePLReducer;














