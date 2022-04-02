import React, { FC } from "react";
import QuestionList from "components/QuestionList";
import isStackContext from "context/IsStackContext";

const Feed: FC = () => {
  return (
    <isStackContext.Provider value={false}>
      <QuestionList
        questionList={["a", "b", "c", "d", "e", "f", "g"]}
        index={0}
      />
    </isStackContext.Provider>
  );
};

export default Feed;
