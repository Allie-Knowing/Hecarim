import {
  deleteTextAnswerRequest,
  getTextAnswerListRequest,
  postTextAnswerRequest,
} from "modules/dto/request/textAnswerRequest";
import {
  deleteTextAnswer,
  getTextAnswerList,
  postTextAnswer,
  resetTextAnswerList,
} from "modules/redux/action/textAnswer";
import { useDispatch } from "react-redux";
import { useSelectState } from "../default";

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
    resetTextAnswerList: () => {
      dispatch(resetTextAnswerList());
    },
  };

  return { state, setState };
};

export default useTextAnswer;
