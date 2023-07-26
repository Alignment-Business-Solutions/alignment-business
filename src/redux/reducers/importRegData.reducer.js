const importRegDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_REG_IMPORT_DATA':
      return action.payload;
    case 'UNSET_REG_IMPORT_DATA':
      return [];
    default:
      return state;
  }
};

export default importRegDataReducer;








