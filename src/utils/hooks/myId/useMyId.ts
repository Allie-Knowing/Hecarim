import { getMyId } from "modules/redux/action/myId";
import { useDispatch } from "react-redux";
import useSelectState from "../default/useSelectState";

const useMyId = () => {
  const dispatch = useDispatch();
  const state = useSelectState().myId;
  const setState = {
    myId: () => {
      dispatch(getMyId());
    },
  };

  return {
    state,
    setState,
  };
};

export default useMyId;
