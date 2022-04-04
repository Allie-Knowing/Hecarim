import { signinActionType } from "modules/redux/action/signin";
import {
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,
  RESET,
  SIGNIN,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
} from "modules/redux/action/signin/interface";
import SigninState from "./interface";

const initState: SigninState = {
  signinRequest: {},
  isSignin: false,
  error: {
    type: "",
    status: 0,
    message: "",
  },
};

const signinReducer = (
  state: SigninState = initState,
  action: signinActionType
): SigninState => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        signinRequest: action.payload,
      };
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
