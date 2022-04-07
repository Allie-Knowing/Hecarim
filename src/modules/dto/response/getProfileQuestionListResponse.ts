export type getProfileQuestionListResponse = { data: ProfileQuestionType[] };

export type ProfileQuestionType = {
  id: string;
  video_description: string;
  video_title: string;
  thumbnail?: string;
  user_profile?: string;
  video_url: string;
  created_at: string;
  comment_cnt: number;
  like_cnt: number;
  is_mine: boolean;
  is_like: boolean;
  is_adoption: number;
};
