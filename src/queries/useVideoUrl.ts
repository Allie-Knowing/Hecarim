import { getVideoUrl } from "utils/api/videoUrl";
import { useMutation } from "react-query";

interface mutateType {
  type: "question" | "answer";
  file: string | FormData;
}

export const useVideoUrlMutation = () => {
  const videoUrl = useMutation((mutation: mutateType) => getVideoUrl(mutation.type, mutation.file));

  return { videoUrl };
};
