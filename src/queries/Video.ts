import { useMutation } from "react-query";
import { reportVideo } from "../api/Video";

export const useVideoMutation = (videoId: number, description: string) => {
  const report = useMutation(() => reportVideo(videoId, description));

  return { report };
};
