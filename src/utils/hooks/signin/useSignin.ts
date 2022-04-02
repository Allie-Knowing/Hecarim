import { signinRequest } from "modules/dto/request/signinRequest";
import { signin } from "modules/redux/action/signin";
import { ReducerType } from "modules/redux/store";
import { useDispatch, useSelector } from "react-redux";

const useSignin = () => {
  const dispatch = useDispatch();
  const signinState = useSelector((state: ReducerType) => state).signin;
  const setState = {
    signin: (payload: signinRequest) => {
      dispatch(signin(payload));
    },
  };

  return {
    state: signinState,
    setState,
  };
};

export default useSignin;
