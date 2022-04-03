import React, { FC } from "react";
import QuestionList from "components/QuestionList";
import isStackContext from "context/IsStackContext";
import useFeed from "utils/hooks/feed/useFeed";

const Feed: FC = () => {
  const { state, setState } = useFeed();

  React.useEffect(() => {
    setState.getVideoAnswerList();
  }, []);

  return (
    <isStackContext.Provider value={false}>
      <QuestionList
        questionList={["a", "b", "c", "d", "e", "f", "g"]}
        index={0}
        {...state}
        {...setState}
      />
    </isStackContext.Provider>
  );
};

export default Feed;
