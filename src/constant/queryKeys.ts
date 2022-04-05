const queryKeys = {
  questionList: "question_list",
  question: "question",
  questionId: (questionId: number) => `question_id_${questionId}`,
  textAnswerList: "text_answer_list",
  page: (page: number) => `page_${page}`,
} as const;

export default queryKeys;
