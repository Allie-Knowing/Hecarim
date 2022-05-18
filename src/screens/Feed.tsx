import React, { FC, useCallback, useEffect, useMemo } from "react";
import QuestionList from "components/QuestionList";
import isStackContext from "context/IsStackContext";
import { useQuestionList } from "queries/Question";
import { useNotificationPermission } from "hooks/useNotificationPermission";
import { postExpoToken } from "utils/api/notification";

const size = 10;

const Feed: FC = () => {
  const { data, fetchNextPage, isError } = useQuestionList(size);

  const onQuestionEndReached = useCallback(() => {
    if (!isError) {
      fetchNextPage();
    }
  }, [fetchNextPage]);

  const list = useMemo(
    () =>
      data
        ? (data.pages || [])
            .map((value) => value.data)
            .reduce(function (acc, cur) {
              return acc.concat(cur);
            })
        : [],
    [data]
  );

  return (
    <isStackContext.Provider value={false}>
      <QuestionList
        questionList={list}
        index={0}
        onQuestionEndReached={onQuestionEndReached}
      />
    </isStackContext.Provider>
  );
};

export default Feed;
