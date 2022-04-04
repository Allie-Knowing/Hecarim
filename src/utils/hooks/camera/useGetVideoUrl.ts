import { useDispatch } from "react-redux";
import { getVideoUrlRequest } from "modules/dto/request/getVideoUrlRequest";
import { postVideoUpload } from "modules/redux/action/videoUrl";
import useSelectState from "../default/useSelectState";

const useGetVideoUrl = () => {
  const dispatch = useDispatch();
  const state = useSelectState().camera;
  const setState = {
    postVideo: (payload: getVideoUrlRequest) => {
      dispatch(postVideoUpload(payload));
    },
  };

  return { state, setState };
};

export default useGetVideoUrl;
