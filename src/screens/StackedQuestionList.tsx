import React, { FC } from "react";
import QuestionList from "components/QuestionList";
import isStackContext from "context/IsStackContext";

const StackedQuestionList: FC = () => {
  return (
    <isStackContext.Provider value={true}>
      <QuestionList
        questionList={["a", "b", "c", "d", "e", "f", "g"]}
        index={0}
      />
    </isStackContext.Provider>
  );
};

export default StackedQuestionList;
