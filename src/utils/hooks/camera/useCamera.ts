import { useDispatch } from "react-redux";
import { postCameraRequest } from "modules/dto/request/postCameraRequest";
import { postVideoUpload } from "modules/redux/action/camera";
import useSelectState from "../default/useSelectState";

const useCamera = () => {
  const dispatch = useDispatch();
  const state = useSelectState().camera;
  const setState = {
    postVideo: (payload: postCameraRequest) => {
      dispatch(postVideoUpload(payload));
    },
  };

  return { state, setState };
};

export default useCamera;
