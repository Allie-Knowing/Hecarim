import { useMutation } from "react-query";
import { reportVideo } from "../api/Video";

export const useVideoMutation = (videoId: number) => {
  const report = useMutation((description: string) =>
    reportVideo(videoId, description)
  );

  return { report };
};
