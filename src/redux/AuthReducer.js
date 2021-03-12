export const loginStatuses = {
  INACTIVE: "INACTIVE",
  START: "START",
  LOGOUT: "LOGOUT",
  SUCCESSFULL: "SUCCESSFULL",
  INVALID: "INVALID",
  SERVERERROR: "SERVERERROR",
};

const initialState = {
  isAuthenticated: false,
  loginLoading: false,
  loginStatus: "INACTIVE",
  errorMessage: null,
};

//Action creator
export const doLogin = (email, pw) => {
  return async (dispatch) => {
    dispatch({ type: loginStatuses.START });
    try {
      //Delay to simulate server delay
      await new Promise((resolve) => {
        setTimeout(resolve, 4000);
      });

      if (email === "test@gmail.com" && pw === "1234") {
        dispatch({
          type: loginStatuses.SUCCESSFULL,
        });
      } else {
        dispatch({
          type: loginStatuses.INVALID,
          error: "Invalid login or password",
        });
      }
    } catch (err) {
      dispatch({
        type: loginStatuses.SERVERERROR,
        error: "There was an error while connecting to the server",
      });
    }
  };
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case loginStatuses.START:
      return {
        ...state, //In case we add more variables later
        loginStatus: loginStatuses.START,
        errorMessage: null,
      };
    case loginStatuses.SUCCESSFULL:
      return {
        ...state, //In case we add more variables later
        loginStatus: loginStatuses.SUCCESSFULL,
        isAuthenticated: true,
      };
    case loginStatuses.SERVERERROR:
      return {
        ...state, //In case we add more variables later
        isAuthenticated: false,
        loginStatus: loginStatuses.SERVERERROR,
        errorMessage: action.error,
      };
    case loginStatuses.INVALID:
      return {
        ...state, //In case we add more variables later
        isAuthenticated: false,
        loginStatus: loginStatuses.INVALID,
        errorMessage: action.error,
      };
    case loginStatuses.LOGOUT:
      return {
        ...state, //In case we add more variables later
        isAuthenticated: false,
        loginStatus: loginStatuses.INACTIVE,
      };
    default:
      return state;
  }
}

export default AuthReducer;
