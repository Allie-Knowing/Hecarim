export type getProfileQuestionListResponse = { data: ProfileQuestionType[] };

export type ProfileQuestionType = {
  id: number;
  video_url: string;
  thumbnail?: string;
};
