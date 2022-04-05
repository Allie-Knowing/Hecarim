import {
  deleteTextAnswer,
  getTextAnswerList,
  postTextAnswer,
} from "api/TextAnswer";
import queryKeys from "constant/queryKeys";
import { useMutation, useQuery } from "react-query";

export const useTextAnswerList = (
  questionId: number,
  page: number,
  size: number
) =>
  useQuery(
    [queryKeys.questionList, questionId, queryKeys.textAnswerList, page],
    () => getTextAnswerList(questionId, page, size),
    { keepPreviousData: true }
  );

export const useTextAnswerMutation = () => {
  const post = useMutation(
    ({ questionId, content }: { questionId: number; content: string }) =>
      postTextAnswer(questionId, content)
  );

  const remove = useMutation(({ commentId }: { commentId: number }) =>
    deleteTextAnswer(commentId)
  );

  return { post, remove };
};
