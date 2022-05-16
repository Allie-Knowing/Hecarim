import { StackScreenProps } from "@react-navigation/stack";
import VideoAnswer from "components/VideoAnswer";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";

const StackedAnswerList: FC<
  StackScreenProps<MainStackParamList, "StackedQuestionList">
> = () => {
  return <VideoAnswer />;
};

export default StackedAnswerList;
