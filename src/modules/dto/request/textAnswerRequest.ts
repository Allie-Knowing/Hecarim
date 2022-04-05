export type postTextAnswerRequest = {
  questionId?: number;
  content?: string;
};

export type getTextAnswerListRequest = {
  questionId?: number;
  page?: number;
  size?: number;
};

export type deleteTextAnswerRequest = {
  commentId?: number;
};
