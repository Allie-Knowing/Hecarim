import { signinRequest } from "modules/dto/request/signinRequest";
import { reset, signin } from "modules/redux/action/signin";
import { useDispatch } from "react-redux";
import useSelectState from "../default/useSelectState";

const useSignin = () => {
  const dispatch = useDispatch();
  const signinState = useSelectState().signin;
  const setState = {
    signin: (payload: signinRequest) => {
      dispatch(signin(payload));
    },
    reset: () => {
      dispatch(reset());
    },
  };

  return {
    state: signinState,
    setState,
  };
};

export default useSignin;
