import { useDispatch } from "react-redux";
import { getVideoAnswerList } from "modules/redux/action/feed";
import useSelectState from "../default/useSelectState";

const useFeed = () => {
  const dispatch = useDispatch();
  const state = useSelectState().feed;
  const setState = {
    getVideoAnswerList: () => {
      dispatch(getVideoAnswerList());
    }
  }
  return { state, setState }
}

export default useFeed;