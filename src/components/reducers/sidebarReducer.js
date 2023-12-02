const sidebarReducer = (state, action) => {
  switch (action.type) {
    case "FIRST_POSITION_BUTTON_COLOR_CHANGE":
      return { ...state, firstButton: true, secondButton: false };
    case "SECOND_POSITION_BUTTON_COLOR_CHANGE":
      return { ...state, firstButton: false, secondButton: true };
    case "POSITION_BUTTON_DEFAULT_DATA":
      return { ...state, defaultData: true, userData: false };
    case "POSITION_BUTTON_USER_DATA":
      return { ...state, defaultData: false, userData: true };
    case "GET_DATA_FROM_LOCAL_STORAGE":
      return {
        ...state,
        value_2: JSON.parse(localStorage.getItem("user_data")),
      };
  }
};

export default sidebarReducer;
