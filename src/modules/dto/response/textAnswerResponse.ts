export type getTextAnswerList = {
  id?: number;
  content?: string;
  is_adoption?: false;
  updated_at?: string;
  created_at?: string;
  user?: {
    id?: number;
    profile?: string;
    name?: string;
  };
  is_mine?: boolean;
};

export type getTextAnswerListResponse = {
  data?: getTextAnswerList[];
};
