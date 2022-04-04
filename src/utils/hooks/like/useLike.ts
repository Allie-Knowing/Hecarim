import { likeRequest } from "modules/dto/request/likeRequest";
import { deleteLike, postLike } from "modules/redux/action/like";
import { useDispatch } from "react-redux";
import useSelectState from "../default/useSelectState";

const useLike = () => {
  const dispatch = useDispatch();
  const state = useSelectState().like;

  const setState = {
    postLike: (payload: likeRequest) => {
      dispatch(postLike(payload));
    },
    deleteLike: (payload: likeRequest) => {
      dispatch(deleteLike(payload));
    },
  };

  return { state, setState };
};

export default useLike;
