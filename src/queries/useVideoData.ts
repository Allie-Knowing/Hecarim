import { postQuestionVideoData, postAnswerVideoData } from "utils/api/videoData";
import { useMutation } from "react-query";

interface questionMutateType {
  title: string;
  description: string;
  hash_tag: string[];
  video_url: string;
}

interface answerMutateType {
  data: {
    title: string;
    video_url: string;
  };
  feed_id: number;
}

export const useVideoDataMutation = () => {
  const postQuestion = useMutation((mutation: questionMutateType) =>
    postQuestionVideoData(mutation)
  );
  const postAnswer = useMutation((mutation: answerMutateType) =>
    postAnswerVideoData(mutation.data, mutation.feed_id)
  );

  return { postQuestion, postAnswer };
};
