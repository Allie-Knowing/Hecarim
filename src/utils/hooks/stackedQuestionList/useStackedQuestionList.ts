import { postStackedQuestionList } from "modules/redux/action/stackedQuestionList";
import { StackedQuestionListState } from "modules/redux/reducer/stackedQuestionList/interface";
import { useDispatch } from "react-redux";
import { useSelectState } from "../default";

const useStackedQuestionList = () => {
  const dispatch = useDispatch();
  const state = useSelectState().stackedQuestionList;

  const setState = {
    postStackedQuestionList: (payload: StackedQuestionListState) => {
      dispatch(postStackedQuestionList(payload));
    },
  };

  return { state, setState };
};

export default useStackedQuestionList;
