import { error } from "modules/dto/error";
import { signinRequest } from "modules/dto/request/signinRequest";

interface SigninState {
  signinRequest: signinRequest;
  isSignin: boolean;
  error: error;
}

export default SigninState;
