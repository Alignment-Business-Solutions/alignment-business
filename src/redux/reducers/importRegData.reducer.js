const importRegDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_REG_IMPORT_DATA':
      return action.payload;
    case 'UNSET_IMPORT_DATA':
          return [];
    case 'LOGOUT2':
      return [];
    default:
      return state;
  }
};

export default importRegDataReducer;








