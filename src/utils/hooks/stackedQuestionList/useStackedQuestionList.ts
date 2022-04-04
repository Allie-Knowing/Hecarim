import { postStackedQuestionList } from "modules/redux/action/stackedQuestionList";
import { StackedQuestionListState } from "modules/redux/reducer/stackedQuestionList/interface";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelectState } from "../default";

const useStackedQuestionList = () => {
  const dispatch = useDispatch();
  const selectState = useSelectState();
  const stackedQuestionList = useMemo(
    () => selectState.stackedQuestionList.stackedQuestionList,
    [selectState.stackedQuestionList.stackedQuestionList]
  );

  const setStackedQuestionList = useCallback(
    (payload: StackedQuestionListState) => {
      dispatch(postStackedQuestionList(payload));
    },
    [dispatch]
  );

  return { stackedQuestionList, setStackedQuestionList };
};

export default useStackedQuestionList;
