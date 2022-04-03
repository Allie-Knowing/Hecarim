export type getTextAnswer = {
  id?: number;
  content?: string;
  isAdoption?: boolean;
  userId?: number;
};

export type getTextAnswerListResponse = {
  data?: getTextAnswer[];
};
