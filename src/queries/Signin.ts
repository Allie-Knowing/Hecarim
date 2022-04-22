import { postSigninApi } from "api/Signin";
import { SigninRequest } from "api/Signin";
import { useMutation } from "react-query";

const useSignin = () => {
  const signin = useMutation((body: SigninRequest) => postSigninApi(body));
  return signin;
};

export default useSignin;
