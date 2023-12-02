const childrenListReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_WRITING_PART":
      return { ...state, openWritingPart: !action.payload }; // action payload is boolean
    case "STORAGE_DEFAULT_DATA_UUID":
      return { ...state, storageDefaultDataUUID: action.payload };
    case "SEND_ENGLISH_WORD":
      return { ...state, sendEnglishWord: action.payload };
  }
};

export default childrenListReducer;
