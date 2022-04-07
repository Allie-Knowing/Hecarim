import uri from "constance/uri";
import { instance } from "utils/axios";

export const postQuestionVideoData = async (request_body: {
  title: string;
  description: string;
  hash_tag: string[];
  video_url: string;
}) => {
  const data = await instance.post(uri.question, request_body);
  return data;
};

export const postAnswerVideoData = async (
  request_body: {
    title: string;
    video_url: string;
  },
  feed_id: number
) => {
  const data = await instance.post(`${uri.answer}${feed_id}`, request_body);

  return data;
};
