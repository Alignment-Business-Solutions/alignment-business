
const singlePLReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WEEK_DATA':
      return action.payload;
    case 'UNSET_WEEK_DATA':
          return [];
    case 'LOGOUT2':
      return [];
    default:
      return state;
  }
};

export default singlePLReducer;














