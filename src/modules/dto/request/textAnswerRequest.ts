export type postTextAnswerRequest = {
  questionId?: number;
  content?: string;
};

export type getTextAnswerRequest = {
  questionId?: number;
  page?: number;
  size?: number;
};

export type deleteTextAnswerRequest = {
  commentId: string;
};
