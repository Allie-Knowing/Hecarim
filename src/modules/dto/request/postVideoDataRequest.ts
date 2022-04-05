export type postQuestionVideoDataRequest = {
  title: string;
  description: string;
  hash_tag: string[];
  video_url: string;
};

export type postAnswerVideoDataRequest = {
  title: string;
  video_url: string;
};
