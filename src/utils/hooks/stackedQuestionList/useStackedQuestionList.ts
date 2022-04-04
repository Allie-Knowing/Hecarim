import { postStackedQuestionListRequest } from "modules/dto/request/postStackedQuestionListRequest";
import { postStackedQuestionList } from "modules/redux/action/stackedQuestionList";
import { useDispatch } from "react-redux";
import { useSelectState } from "../default";

const useStackedQuestionList = () => {
  const dispatch = useDispatch();
  const state = useSelectState().stackedQuestionList;

  const setState = {
    postStackedQuestionList: (payload: postStackedQuestionListRequest) => {
      dispatch(postStackedQuestionList(payload));
    },
  };

  return { state, setState };
};

export default useStackedQuestionList;
