import { deleteLike, postLike } from "api/Like";
import { useMutation } from "react-query";

const useLikeMutation = () => {
  return useMutation((videoId: number) => postLike(videoId));
};

const useUnlikeMutation = () => {
  return useMutation((videoId: number) => deleteLike(videoId));
};

export default { useLikeMutation, useUnlikeMutation };
