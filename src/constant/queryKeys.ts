const queryKeys = {
  questionList: "question_list",
  question: "question",
  answer: "answer",
  videoAnswerId: (videoId: number) => `video_answer_${videoId}`,
  questionHashtag: "question_hashtag",
  questionId: (questionId: number) => `question_id_${questionId}`,
  textAnswerList: "text_answer_list",
  profile: "profile",
  profileQuestionList: "profile_question_list",
  myId: "my_id",
  page: (page: number) => `page_${page}`,
} as const;

export default queryKeys;
