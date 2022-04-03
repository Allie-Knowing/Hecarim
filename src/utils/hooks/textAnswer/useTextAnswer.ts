import {
  deleteTextAnswerRequest,
  getTextAnswerListRequest,
  postTextAnswerRequest,
} from "modules/dto/request/textAnswerRequest";
import {
  deleteTextAnswer,
  getTextAnswerList,
  postTextAnswer,
} from "modules/redux/action/textAnswer";
import { useDispatch } from "react-redux";
import useSelectState from "../default/useSelectState";

const useTextAnswer = () => {
  const dispatch = useDispatch();
  const state = useSelectState().textAnswer;
  const setState = {
    getTextAnswerList: (payload: getTextAnswerListRequest) => {
      dispatch(getTextAnswerList(payload));
    },
    postTextAnswer: (payload: postTextAnswerRequest) => {
      dispatch(postTextAnswer(payload));
    },
    deleteTextAnswer: (payload: deleteTextAnswerRequest) => {
      dispatch(deleteTextAnswer(payload));
    },
  };

  return { state, setState };
};

export default useTextAnswer;
