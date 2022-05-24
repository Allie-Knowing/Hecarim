const queryKeys = {
  questionList: "question_list",
  question: "question",
  stackQuestion: "stack_question",
  answer: "answer",
  videoAnswerId: (videoId: number) => `video_answer_${videoId}`,
  questionHashtag: "question_hashtag",
  questionId: (questionId: number) => `question_id_${questionId}`,
  stackQuestionId: (id: number) => `id_${id}`,
  textAnswerList: "text_answer_list",
  search: "search",
  profile: "profile",
  profileQuestionList: "profile_question_list",
  myId: "my_id",
  page: (page: number) => `page_${page}`,
  interests: "interests",
  walletPoint: "wallet_point",
  walletActivityScore: "wallet_activity_score",
  IQHistory: "iq_history",
  count: "count",
  profileAnswerList: "profile_answer_list",
} as const;

export default queryKeys;
