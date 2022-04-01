import React, { FC } from "react";
import QuestionList from "components/QuestionList";

const StackedQuestionList: FC = () => {
  return (
    <QuestionList
      questionList={["a", "b", "c", "d", "e", "f", "g"]}
      index={0}
    />
  );
};

export default StackedQuestionList;
