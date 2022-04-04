export type getProfileQuestionListResponse = ProfileQuestionType[];

export type ProfileQuestionType = {
  id: number;
  video_url: string;
  comment_cnt?: number;
  like_cnt?: number;
};
