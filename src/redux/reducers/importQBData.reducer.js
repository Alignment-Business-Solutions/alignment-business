const importQBDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_QB_IMPORT_DATA':
      return action.payload;
    case 'UNSET_QB_IMPORT_DATA':
      return [];
    default:
      return state;
  }
};

export default importQBDataReducer;






