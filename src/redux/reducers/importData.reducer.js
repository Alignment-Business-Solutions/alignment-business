const importDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_IMPORT_DATA':
      return action.payload;
    case 'UNSET_IMPORT_DATA':
      return [];
    default:
      return state;
  }
};

export default importDataReducer;






