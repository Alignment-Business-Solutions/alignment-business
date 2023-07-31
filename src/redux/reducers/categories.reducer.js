

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CAT':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default categoriesReducer;












