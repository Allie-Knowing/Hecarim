import { useDispatch } from "react-redux";
import { getVideoUrlRequest } from "modules/dto/request/getVideoUrlRequest";
import { getVideoUrl } from "modules/redux/action/videoUrl";
import useSelectState from "../default/useSelectState";

const useGetVideoUrl = () => {
  const dispatch = useDispatch();
  const state = useSelectState().videoUrl;
  const setState = {
    getVideoUrl: (payload: getVideoUrlRequest) => {
      dispatch(getVideoUrl(payload));
    },
  };

  return { state, setState };
};

export default useGetVideoUrl;
