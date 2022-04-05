import { deleteLike, postLike } from "api/Like";
import { useMutation } from "react-query";

const useLikeMutation = () => {
  const like = useMutation((videoId: number) => postLike(videoId));
  const unLike = useMutation((videoId: number) => deleteLike(videoId));

  return { like, unLike };
};

export default { useLikeMutation };