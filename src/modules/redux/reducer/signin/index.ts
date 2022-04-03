import { signinActionType } from "modules/redux/action/signin";
import {
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,
  RESET,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
} from "modules/redux/action/signin/interface";
import SigninState from "./interface";

const initState: SigninState = {
  isSignin: false,
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
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isSignin: true,
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isSignin: false,
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
    case RESET:
      return {
        ...state,
        ...initState,
      };
    default:
      return state;
  }
};

export default signinReducer;
