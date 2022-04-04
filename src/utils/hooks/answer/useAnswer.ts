import { useDispatch } from "react-redux";
import { getVideoAnswerList } from "modules/redux/action/answer";
import useSelectState from "../default/useSelectState";

const useAnswer = () => {
  const dispatch = useDispatch();
  const state = useSelectState().answer;
  const setState = {
    getVideoAnswerList: () => {
      dispatch(getVideoAnswerList());
    }
  }
  return { state, setState }
}

export default useAnswer;