import {
  deleteTextAnswer,
  getTextAnswerList,
  postTextAnswer,
} from "api/TextAnswer";
import queryKeys from "constant/queryKeys";
import { useMutation, useQuery } from "react-query";

export const useTextAnswerList = ({
  page,
  questionId,
  enabled,
  size,
}: {
  questionId: number;
  page: number;
  size: number;
  enabled: boolean;
}) =>
  useQuery(
    [queryKeys.questionList, questionId, queryKeys.textAnswerList, page],
    async () => (await getTextAnswerList(questionId, page, size)).data.data,
    {
      enabled,
      keepPreviousData: true,
    }
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
