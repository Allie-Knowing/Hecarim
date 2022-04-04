import { useCallback } from "react";
import { useLike } from "../utils/hooks/like";

const useLikeEvent = (videoId: number) => {
  const { setState } = useLike();

  const dislike = useCallback(() => {
    setState.deleteLike({ videoId });
  }, [setState, videoId]);

  const like = useCallback(() => {
    setState.postLike({ videoId });
  }, [setState, videoId]);

  return { dislike, like };
};

export default useLikeEvent;
