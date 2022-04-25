import { GoogleSigninRequest, postGoogleSigninApi } from "api/Signin";
import { useMutation } from "react-query";

const useGoogleSignin = () => {
  const signin = useMutation((body: GoogleSigninRequest) =>
    postGoogleSigninApi(body)
  );
  return signin;
};

export default useGoogleSignin;
