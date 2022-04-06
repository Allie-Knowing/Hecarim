import { postSigninApi } from "api/Signin";
import { signinRequest } from "modules/dto/request/signinRequest";
import { useMutation } from "react-query";

const useSignin = () => {
  const signin = useMutation((body: signinRequest) => postSigninApi(body));

  return signin;
};

export default useSignin;
