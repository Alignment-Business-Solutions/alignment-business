
const singlePLReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WEEK_DATA':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default singlePLReducer;














