import { useMutation } from "react-query";
import { blockVideo, reportVideo } from "../api/Video";

export const useVideoMutation = (videoId: number) => {
  const report = useMutation((description: string) => reportVideo(videoId, description));

  const block = useMutation(() => blockVideo(videoId));

  return { report, block };
};
