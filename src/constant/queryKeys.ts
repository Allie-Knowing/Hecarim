const queryKeys = {
  questionList: "question_list",
  question: "question",
  questionId: (questionId: number) => `question_id_${questionId}`,
  textAnswerList: "text_answer_list",
  search: "search",
  profile: "profile",
  profileQuestionList: "profile_question_list",
  myId: "my_id",
  page: (page: number) => `page_${page}`,
} as const;

export default queryKeys;
