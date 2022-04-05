import { useDispatch } from "react-redux";
import {
  postQuestionVideoDataRequest,
  postAnswerVideoDataRequest,
} from "modules/dto/request/postVideoDataRequest";
import { postQuestionVideoData, postAnswerVideoData } from "modules/redux/action/videoData";
import { useSelectState } from "../default";

const useVideoData = () => {
  const dispatch = useDispatch();
  const state = useSelectState().videoData;
  const setState = {
    postQuestionVideoData: (payload: postQuestionVideoDataRequest) => {
      dispatch(postQuestionVideoData(payload));
    },
    postAnswerVideoData: (payload: postAnswerVideoDataRequest) => {
      dispatch(postAnswerVideoData(payload));
    },
  };

  return { state, setState };
};

export default useVideoData;
