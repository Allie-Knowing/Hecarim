import React, { FC } from "react";
import QuestionList from "components/QuestionList";

const Feed: FC = () => {
  return (
    <QuestionList
      questionList={["a", "b", "c", "d", "e", "f", "g"]}
      index={0}
    />
  );
};

export default Feed;
