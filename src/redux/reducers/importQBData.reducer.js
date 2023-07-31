const importQBDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_QB_IMPORT_DATA':
      return action.payload;
    case 'LOGOUT2':
      return [];
    default:
      return state;
  }
};

export default importQBDataReducer;






