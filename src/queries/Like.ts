import { deleteLike, postLike } from "api/Like";
import { useMutation } from "react-query";

const useLikeMutation = (videoId: number) => {
  const like = useMutation(() => postLike(videoId));
  const unLike = useMutation(() => deleteLike(videoId));

  return { like, unLike };
};

export { useLikeMutation };
