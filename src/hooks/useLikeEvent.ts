import { useCallback } from "react";
import { useLike } from "../utils/hooks/like";

const useLikeEvent = (videoId: number) => {
  const { setState } = useLike();

  const unlike = useCallback(() => {
    setState.deleteLike({ videoId });
  }, [setState, videoId]);

  const like = useCallback(() => {
    setState.postLike({ videoId });
  }, [setState, videoId]);

  return { unlike, like };
};

export default useLikeEvent;
