export type getTextAnswerList = {
  id?: number;
  content?: string;
  isAdoption?: boolean;
  userId?: number;
};

export type getTextAnswerListResponse = {
  data?: getTextAnswerList[];
};
