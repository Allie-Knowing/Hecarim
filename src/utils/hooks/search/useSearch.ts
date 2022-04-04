import { useDispatch } from "react-redux";
import { getAutoComplete } from "modules/redux/action/search";
import { searchPayload } from "constance/search";
import useSelectState from "../default/useSelectState";

const useSearch = () => {
  const dispatch = useDispatch();
  const state = useSelectState().search
  const setState = {
    getAutoComplete: (payload: searchPayload) => 
      dispatch(getAutoComplete(payload)),
  }
  return { 
    state, 
    setState
  };
}

export default useSearch;