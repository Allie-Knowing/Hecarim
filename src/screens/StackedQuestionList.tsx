import React, { FC, useMemo } from "react";
import QuestionList from "components/QuestionList";
import isStackContext from "context/IsStackContext";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";

const StackedQuestionList: FC<
  StackScreenProps<MainStackParamList, "StackedQuestionList">
> = ({ route }) => {
  const data = useMemo(() => route.params.data || [], [route.params.data]);
  const index = useMemo(() => route.params.index || 0, [route.params.index]);

  return (
    <isStackContext.Provider value={true}>
      <QuestionList
        onQuestionEndReached={() => {}}
        questionList={data}
        index={index}
      />
    </isStackContext.Provider>
  );
};

export default StackedQuestionList;
