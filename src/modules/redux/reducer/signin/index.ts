import { signinActionType } from "modules/redux/action/signin";
import {
  ERROR,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
} from "modules/redux/action/signin/interface";
import SigninState from "./interface";

const initState: SigninState = {
  error: {
    type: "",
    statusCode: 0,
    message: "",
  },
};

const signinReducer = (
  state: SigninState = initState,
  action: signinActionType
) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
      };
    case REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default signinReducer;
