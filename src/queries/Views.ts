import { patchViews } from "api/Views";
import { useMutation } from "react-query";

export const useViewsMutation = (videoId: number) => {
  const views = useMutation(() => patchViews(videoId));

  return views;
};
